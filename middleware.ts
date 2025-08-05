import { createClerkClient } from '@clerk/backend';
import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';

const clerkClient = createClerkClient({ secretKey: process.env.CLERK_SECRET_KEY });

const isPublicRoute = createRouteMatcher([
  '/api(.*)',
  '/api/stripe/webhook',
  '/',
]);

const routeAccess = {
  Free: createRouteMatcher(['/home(.*)', '/settings(.*)']),
  Base: createRouteMatcher(['/pro-home(.*)', '/settings(.*)']),
  Plus: createRouteMatcher(['/plus-home(.*)', '/settings(.*)']),
};

export default clerkMiddleware(async (auth, req) => {
  const { userId, redirectToSignIn } = await auth();

  if (isPublicRoute(req)) return;

  if (!userId) return redirectToSignIn({ returnBackUrl: req.url });

  const user = await clerkClient.users.getUser(userId);
  const plan = user.privateMetadata?.plan || 'Free';
  const matcher = routeAccess[plan as keyof typeof routeAccess];
  console.log('Subscription Plan :>> ', plan);

  if (!matcher || !matcher(req)) {
    if (plan === 'Free') {
      return NextResponse.redirect(new URL("/home", req.url));
    }
  }

}
);

export const config = {
  matcher: [
    '/((?!_next|.*\\..*).*)',
    '/(api|trpc)(.*)',
  ],
};
