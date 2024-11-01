'use client'

import { useState } from 'react'
import ClientForm from './client-form'
import RankingList from './ranking-list'

export default function DashboardPage() {
  const [clients, setClients] = useState([])

  const handleClientAdded = async () => {
    const response = await fetch('/api/clients')
    const newClients = await response.json()
    setClients(newClients)
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        </div>
      </header>
      <main>
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <ClientForm onClientAdded={handleClientAdded} />
          <RankingList clients={clients} />
        </div>
      </main>
    </div>
  )
}