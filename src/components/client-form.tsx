'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { toast } from "@/hooks/use-toast"
import { Loader2 } from "lucide-react"

type Client = {
  id: string
  name: string
  cpf: string
  phone: string
  totalSpent: number
  lastPurchase: string
}

type Purchase = {
  id: string
  amount: number
  date: string
}

interface ClientFormProps {
  onClientAdded?: () => void
  companyId: string
}

export default function ClientForm({ onClientAdded, companyId }: ClientFormProps) {
  const [client, setClient] = useState<Client | null>(null)
  const [cpf, setCpf] = useState('')
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [amount, setAmount] = useState('')
  const [purchases, setPurchases] = useState<Purchase[]>([])
  const [isLoading, setIsLoading] = useState(false)

  const fetchClientData = async (cpf: string) => {
    setIsLoading(true)
    try {
      const response = await fetch(`/api/clients/${cpf}?companyId=${companyId}`)
      if (response.ok) {
        const data = await response.json()
        setClient(data.client)
        setName(data.client.name)
        setPhone(data.client.phone)
        setPurchases(data.purchases)
      } else {
        setClient(null)
        setName('')
        setPhone('')
        setPurchases([])
      }
    } catch (error) {
      console.error('Erro ao buscar dados do cliente:', error)
      toast({
        title: "Erro",
        description: "Não foi possível buscar os dados do cliente.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    if (!cpf || !name || !phone || !amount || !companyId) {
      setIsLoading(false)
      toast({
        title: "Erro",
        description: "Por favor, preencha todos os campos obrigatórios.",
        variant: "destructive",
      })
      return
    }

    try {
      const response = await fetch('/api/clients', {
        method: client ? 'PUT' : 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          cpf,
          name,
          phone,
          amount: parseFloat(amount),
          companyId,
        }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Falha ao salvar o cliente')
      }

      const data = await response.json()
      toast({
        title: client ? "Cliente atualizado" : "Cliente adicionado",
        description: `${name} foi ${client ? 'atualizado' : 'adicionado'} com sucesso.`,
      })
      setClient(data.client)
      setPurchases(data.purchases)
      setAmount('')
      if (onClientAdded) {
        onClientAdded()
      }
    } catch (error) {
      console.error('Erro ao salvar cliente:', error)
      toast({
        title: "Erro",
        description: error instanceof Error ? error.message : "Ocorreu um erro ao salvar o cliente.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{client ? 'Atualizar Cliente' : 'Adicionar Novo Cliente'}</CardTitle>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="cpf">CPF</Label>
            <Input
              id="cpf"
              value={cpf}
              onChange={(e) => {
                setCpf(e.target.value)
                if (e.target.value.length === 11) {
                  fetchClientData(e.target.value)
                }
              }}
              placeholder="Digite o CPF"
              maxLength={11}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="name">Nome</Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Nome do cliente"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="phone">Telefone</Label>
            <Input
              id="phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="Telefone do cliente"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="amount">Valor da Compra</Label>
            <Input
              id="amount"
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="Valor da compra"
              step="0.01"
              min="0"
              required
            />
          </div>
          {client && (
            <div className="space-y-2">
              <Label>Histórico de Compras</Label>
              <div className="max-h-40 overflow-y-auto">
                <table className="w-full">
                  <thead>
                    <tr>
                      <th className="text-left">Data</th>
                      <th className="text-right">Valor</th>
                    </tr>
                  </thead>
                  <tbody>
                    {purchases.map((purchase) => (
                      <tr key={purchase.id}>
                        <td>{new Date(purchase.date).toLocaleDateString()}</td>
                        <td className="text-right">R$ {purchase.amount.toFixed(2)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </CardContent>
        <CardFooter>
          <Button type="submit" disabled={isLoading} className="w-full">
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Processando
              </>
            ) : client ? 'Atualizar Cliente' : 'Adicionar Cliente'}
          </Button>
        </CardFooter>
      </form>
    </Card>
  )
}