'use client'

import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { BarChart as BarChartIcon, Users, DollarSign, ArrowUpRight, ArrowDownRight, Home, Settings, HelpCircle } from 'lucide-react'
import ClientForm from '@/components/client-form'
import RankingList from '@/components/ranking-list'
import SettingsComponent from '@/components/settings'
import { toast } from "@/hooks/use-toast"

type Client = {
  id: string
  name: string
  cpf: string
  totalSpent: number
  lastPurchase: string
}

const salesData = [
  { name: 'Jan', sales: 4000 },
  { name: 'Feb', sales: 3000 },
  { name: 'Mar', sales: 5000 },
  { name: 'Apr', sales: 4500 },
  { name: 'May', sales: 6000 },
  { name: 'Jun', sales: 5500 },
]

const topClientsData = [
  { name: 'João Silva', sales: 12000 },
  { name: 'Maria Santos', sales: 10000 },
  { name: 'Pedro Oliveira', sales: 9000 },
  { name: 'Ana Rodrigues', sales: 8500 },
  { name: 'Carlos Ferreira', sales: 8000 },
]

export default function DashboardPage() {
  const [clients, setClients] = useState<Client[]>([])
  const [activeTab, setActiveTab] = useState('dashboard')
  const [isLoading, setIsLoading] = useState(false)
  const companyId = 'your-company-id' // Replace with actual company ID, perhaps from context or props

  useEffect(() => {
    fetchClients()
  }, [])

  const fetchClients = async () => {
    setIsLoading(true)
    try {
      const response = await fetch(`/api/clients?companyId=${companyId}`)
      if (!response.ok) {
        throw new Error('Failed to fetch clients')
      }
      const data = await response.json()
      setClients(data.clients)
    } catch (error) {
      console.error('Error fetching clients:', error)
      toast({
        title: "Erro",
        description: "Não foi possível carregar os clientes.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleClientAdded = () => {
    fetchClients()
  }

  const handleHelpClick = () => {
    const message = encodeURIComponent("Olá! Preciso de ajuda com o RankingOnline. Pode me auxiliar?")
    window.open(`https://wa.me/5511999999999?text=${message}`, '_blank')
  }

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return (
          <>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-blue-600">Total de Clientes</CardTitle>
                  <Users className="h-4 w-4 text-blue-500" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-blue-800">{clients.length}</div>
                  <p className="text-xs text-blue-500">+20.1% em relação ao mês passado</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-blue-600">Vendas Totais</CardTitle>
                  <DollarSign className="h-4 w-4 text-blue-500" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-blue-800">R$ 45.231,89</div>
                  <p className="text-xs text-green-500 flex items-center">
                    <ArrowUpRight className="h-4 w-4 mr-1" />
                    +15% em relação ao mês passado
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-blue-600">Média de Vendas</CardTitle>
                  <BarChartIcon className="h-4 w-4 text-blue-500" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-blue-800">R$ 320,50</div>
                  <p className="text-xs text-red-500 flex items-center">
                    <ArrowDownRight className="h-4 w-4 mr-1" />
                    -3% em relação ao mês passado
                  </p>
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <Card>
                <CardHeader>
                  <CardTitle className="text-blue-800">Visão Geral de Vendas</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={salesData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="sales" fill="#3B82F6" />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="text-blue-800">Top 5 Clientes</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={topClientsData} layout="vertical">
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis type="number" />
                      <YAxis dataKey="name" type="category" width={100} />
                      <Tooltip />
                      <Bar dataKey="sales" fill="#3B82F6" />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>
          </>
        )
      case 'ranking':
        return (
          <Card>
            <CardHeader>
              <CardTitle className="text-blue-800">Ranking de Clientes</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="mb-4">
                <Input className="max-w-sm" placeholder="Buscar cliente..." />
              </div>
              <RankingList clients={clients} />
            </CardContent>
          </Card>
        )
      case 'add-client':
        return <ClientForm onClientAdded={handleClientAdded} companyId={companyId} />
      case 'settings':
        return <SettingsComponent />
      default:
        return null
    }
  }

  return (
    <div className="flex h-screen bg-blue-50">
      <aside className="w-64 bg-white shadow-md">
        <div className="p-4">
          <h2 className="text-2xl font-bold text-blue-800 mb-4">RankingOnline</h2>
          <nav>
            <ul className="space-y-2">
              <li>
                <Button
                  variant={activeTab === 'dashboard' ? 'default' : 'ghost'}
                  className="w-full justify-start"
                  onClick={() => setActiveTab('dashboard')}
                >
                  <Home className="mr-2 h-4 w-4" />
                  Dashboard
                </Button>
              </li>
              <li>
                <Button
                  variant={activeTab === 'ranking' ? 'default' : 'ghost'}
                  className="w-full justify-start"
                  onClick={() => setActiveTab('ranking')}
                >
                  <BarChartIcon className="mr-2 h-4 w-4" />
                  Ranking
                </Button>
              </li>
              <li>
                <Button
                  variant={activeTab === 'add-client' ? 'default' : 'ghost'}
                  className="w-full justify-start"
                  onClick={() => setActiveTab('add-client')}
                >
                  <Users className="mr-2 h-4 w-4" />
                  Adicionar Cliente
                </Button>
              </li>
              <li>
                <Button 
                  variant={activeTab === 'settings' ? 'default' : 'ghost'}
                  className="w-full justify-start"
                  onClick={() => setActiveTab('settings')}
                >
                  <Settings className="mr-2 h-4 w-4" />
                  Configurações
                </Button>
              </li>
              <li>
                <Button 
                  variant="ghost" 
                  className="w-full justify-start"
                  onClick={handleHelpClick}
                >
                  <HelpCircle className="mr-2 h-4 w-4" />
                  Ajuda
                </Button>
              </li>
            </ul>
          </nav>
        </div>
      </aside>
      <main className="flex-1 p-8 overflow-auto">
        <h1 className="text-3xl font-bold text-blue-800 mb-8">
          {activeTab === 'dashboard' && 'Dashboard'}
          {activeTab === 'ranking' && 'Ranking de Clientes'}
          {activeTab === 'add-client' && 'Adicionar/Atualizar Cliente'}
          {activeTab === 'settings' && 'Configurações'}
        </h1>
        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        ) : (
          renderContent()
        )}
      </main>
    </div>
  )
}