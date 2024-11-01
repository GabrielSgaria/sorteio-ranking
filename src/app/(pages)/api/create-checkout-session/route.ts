import { NextResponse } from 'next/server'
import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-09-30.acacia',
})

export async function POST(request: Request) {
    try {
      const { plan } = await request.json()
  
      let priceId: string
      switch (plan) {
        case 'basic':
          priceId = process.env.STRIPE_BASIC_PLAN_PRICE_ID!
          break
        case 'intermediate':
          priceId = process.env.STRIPE_INTERMEDIATE_PLAN_PRICE_ID!
          break
        case 'advanced':
          priceId = process.env.STRIPE_ADVANCED_PLAN_PRICE_ID!
          break
        default:
          throw new Error('Invalid plan')
      }
  
      const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items: [
          {
            price: priceId,
            quantity: 1,
          },
        ],
        mode: 'subscription',
        success_url: `${request.headers.get('origin')}/success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${request.headers.get('origin')}/cancel`,
      })
  
      return NextResponse.json({ sessionId: session.id })
    } catch (error) {
      if (error instanceof Error) {
        return NextResponse.json({ statusCode: 500, message: error.message }, { status: 500 })
      }
      return NextResponse.json({ statusCode: 500, message: 'An unknown error occurred' }, { status: 500 })
    }
  }