
import { and, desc, eq, isNull } from 'drizzle-orm';
import { db } from './drizzle';
import { activityLogs, teamMembers, teams, users } from './schema';

import { auth, currentUser } from "@clerk/nextjs/server";

export async function getUser() {
  const { redirectToSignIn } = await auth()
  const userClerk = await currentUser()
  console.log('userClerk :>> ', userClerk?.id);
  if (!userClerk?.id)
    return redirectToSignIn()
  const userLegacyDatabase = await getUserDb(userClerk?.privateMetadata.id_webapp as string);
  console.log('userLegacyDatabase :>> ', userLegacyDatabase);
  // if (!userLegacyDatabase?.id)
  // return redirectToSignIn()
  //Siempre puede fallar al intentar crear el usuario en base de datos legacy si pasara deberia enviarse el webhook de creado de usuario de clerk para registrar usuario y equipo
  return userLegacyDatabase;
}

export async function getUserDb(userClerkId: string) {

  const user = await db
    .select()
    .from(users)
    .where(and(eq(users.id, Number(userClerkId)), isNull(users.deletedAt)))
    .limit(1);

  if (user.length === 0) {
    return null;
  }
  return user[0];
}

export async function getTeamByStripeCustomerId(customerId: string) {
  const result = await db
    .select()
    .from(teams)
    .where(eq(teams.stripeCustomerId, customerId))
    .limit(1);

  return result.length > 0 ? result[0] : null;
}

export async function getUserWithCustomerId(stripeCustomerId: string) {
  const result = await db
    .select({
      userId: users.id,
      webappId: users.idWebapp,
      teamId: teamMembers.teamId
    })
    .from(users)
    .leftJoin(teamMembers, eq(users.id, teamMembers.userId))
    .leftJoin(teams, eq(teamMembers.teamId, teams.id))
    .where(eq(teams.stripeCustomerId, stripeCustomerId))
    .limit(1);

  return result.length > 0 ? result[0] : null;
}

export async function updateTeamSubscription(
  teamId: number,
  subscriptionData: {
    stripeSubscriptionId: string | null;
    stripeProductId: string | null;
    planName: string | null;
    subscriptionStatus: string;
  }
) {
  await db
    .update(teams)
    .set({
      ...subscriptionData,
      updatedAt: new Date()
    })
    .where(eq(teams.id, teamId));
}

export async function getUserWithTeam(userId: number) {
  const result = await db
    .select({
      user: users,
      teamId: teamMembers.teamId
    })
    .from(users)
    .leftJoin(teamMembers, eq(users.id, teamMembers.userId))
    .where(eq(users.id, userId))
    .limit(1);

  return result[0];
}

export async function getActivityLogs() {
  const user = await getUser();
  if (!user) {
    throw new Error('User not authenticated');
  }

  return await db
    .select({
      id: activityLogs.id,
      action: activityLogs.action,
      timestamp: activityLogs.timestamp,
      ipAddress: activityLogs.ipAddress,
      userName: users.name
    })
    .from(activityLogs)
    .leftJoin(users, eq(activityLogs.userId, users.id))
    .where(eq(activityLogs.userId, user.id))
    .orderBy(desc(activityLogs.timestamp))
    .limit(10);
}

export async function getTeamForUser() {
  const user = await getUser();
  if (!user) {
    return null;
  }

  const result = await db.query.teamMembers.findFirst({
    where: eq(teamMembers.userId, user.id),
    with: {
      team: {
        with: {
          teamMembers: {
            with: {
              user: {
                columns: {
                  id: true,
                  name: true,
                  email: true
                }
              }
            }
          }
        }
      }
    }
  });

  return result?.team || null;
}