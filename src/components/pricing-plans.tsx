// components/PricingPlans.tsx

import { useState } from 'react'
import { loadStripe } from '@stripe/stripe-js'

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!)

export default function PricingPlans() {
  const [loading, setLoading] = useState(false)

  const handleSubscription = async (plan: string) => {
    setLoading(true)
    const stripe = await stripePromise
    const response = await fetch('/api/create-checkout-session', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ plan }),
    })
    const session = await response.json()
    const result = await stripe!.redirectToCheckout({
      sessionId: session.sessionId,
    })
    if (result.error) {
      console.error(result.error)
    }
    setLoading(false)
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <div className="border p-4 rounded">
        <h3 className="text-xl font-bold mb-2">Plano Básico</h3>
        <p>Até 50 registros</p>
        <p>R$ 59,90/mês</p>
        <button
          onClick={() => handleSubscription('basic')}
          disabled={loading}
          className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
        >
          Assinar
        </button>
      </div>
      <div className="border p-4 rounded">
        <h3 className="text-xl font-bold mb-2">Plano Intermediário</h3>
        <p>Até 250 registros</p>
        <p>R$ 189,90/mês</p>
        <button
          onClick={() => handleSubscription('intermediate')}
          disabled={loading}
          className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
        >
          Assinar
        </button>
      </div>
      <div className="border p-4 rounded">
        <h3 className="text-xl font-bold mb-2">Plano Avançado</h3>
        <p>Registros ilimitados</p>
        <p>R$ 259,90/mês</p>
        <button
          onClick={() => handleSubscription('advanced')}
          disabled={loading}
          className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
        >
          Assinar
        </button>
      </div>
    </div>
  )
}