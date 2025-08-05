import { getUserWithCustomerId } from '@/app/lib/db/queries';
import { getProduct, handleSubscriptionChange, stripe } from '@/app/lib/payments/stripe';
import { createClerkClient } from '@clerk/nextjs/server';
import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!;
const clerkClient = createClerkClient({ secretKey: process.env.CLERK_SECRET_KEY })

const subscriptionEvent = async (event: Stripe.Event) => {
  const subscription = event.data.object as Stripe.Subscription;
  const plan = subscription.items.data[0]?.plan;
  let product = null;

  if (typeof plan?.product === 'string') {
    product = await getProduct(plan.product);
    const customerId = subscription.customer as string;
    const userByCustomer = await getUserWithCustomerId(customerId);
    await clerkClient.users.updateUserMetadata(userByCustomer?.webappId ?? '', {
      privateMetadata: {
        plan: product.name,
      },
    });
  }
  await handleSubscriptionChange(subscription);
}

const subscriptionDelete = async (event: Stripe.Event) => {
  const subscription = event.data.object as Stripe.Subscription;
  const plan = subscription.items.data[0]?.plan;

  if (typeof plan?.product === 'string') {
    const customerId = subscription.customer as string;
    const userByCustomer = await getUserWithCustomerId(customerId);
    await clerkClient.users.updateUserMetadata(userByCustomer?.webappId ?? '', {
      privateMetadata: {
        plan: "Free",
      },
    });
    await handleSubscriptionChange(subscription);
  }
}

export async function POST(request: NextRequest) {
  const payload = await request.text();
  const signature = request.headers.get('stripe-signature') as string;
  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(payload, signature, webhookSecret);
  } catch (err) {
    console.error('Webhook signature verification failed.', err);
    return NextResponse.json(
      { error: 'Webhook signature verification failed.' },
      { status: 400 }
    );
  }
  console.table(['Event Stripe Subscription Table', event.type, event]);

  switch (event.type) {
    case 'customer.subscription.created':
      await subscriptionEvent(event);
    case 'customer.subscription.updated':
      await subscriptionEvent(event);
    case 'customer.subscription.deleted':
      await subscriptionDelete(event);
      break;
    default:
      console.log(`Unhandled event type ${event.type}`);
  }

  return NextResponse.json({ received: true });
}
