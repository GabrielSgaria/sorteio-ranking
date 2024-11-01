'use client'

import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination"
import { toast } from "@/hooks/use-toast"

type Client = {
  id: string
  name: string
  cpf: string
  phone: string
  totalSpent: number
  lastPurchase: string
}

export default function ClientsPage() {
  const [clients, setClients] = useState<Client[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [newClient, setNewClient] = useState({ name: '', cpf: '', amount: '', phone: '' })
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  useEffect(() => {
    fetchClients()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage, searchTerm])

  const fetchClients = async () => {
    try {
      const response = await fetch(`/api/clients?page=${currentPage}&search=${searchTerm}`)
      if (!response.ok) {
        throw new Error('Falha ao buscar clientes')
      }
      const data = await response.json()
      setClients(data.clients)
      setTotalPages(data.totalPages)
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      toast({
        title: "Erro",
        description: "Ocorreu um erro ao buscar os clientes.",
        variant: "destructive",
      })
    }
  }

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value)
    setCurrentPage(1)
  }

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    fetchClients()
  }

  const handleAddClient = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const response = await fetch('/api/clients', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newClient),
      })

      if (!response.ok) {
        throw new Error('Falha ao adicionar cliente')
      }

      const addedClient = await response.json()

      toast({
        title: "Cliente adicionado",
        description: `${addedClient.name} foi adicionado com sucesso.`,
      })

      setNewClient({ name: '', cpf: '', amount: '', phone: '' })
      setIsDialogOpen(false)
      fetchClients()
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      toast({
        title: "Erro",
        description: "Ocorreu um erro ao adicionar o cliente.",
        variant: "destructive",
      })
    }
  }

  const handleEditClient = async (clientId: string) => {
    // Implementar lógica de edição
    console.log('Editar cliente:', clientId)
  }

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold text-blue-800 mb-6">Gerenciar Clientes</h1>
      
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Pesquisar Clientes</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSearchSubmit} className="flex space-x-2">
            <Input
              placeholder="Buscar por nome ou CPF"
              value={searchTerm}
              onChange={handleSearch}
            />
            <Button type="submit">Buscar</Button>
          </form>
        </CardContent>
      </Card>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Lista de Clientes</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nome</TableHead>
                <TableHead>CPF</TableHead>
                <TableHead>Total Gasto</TableHead>
                <TableHead>Última Compra</TableHead>
                <TableHead>Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {clients.map((client) => (
                <TableRow key={client.id}>
                  <TableCell>{client.name}</TableCell>
                  <TableCell>{client.cpf}</TableCell>
                  <TableCell>R$ {client.totalSpent.toFixed(2)}</TableCell>
                  <TableCell>{new Date(client.lastPurchase).toLocaleDateString()}</TableCell>
                  <TableCell>
                    <Button variant="outline" size="sm" onClick={() => handleEditClient(client.id)}>Editar</Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <Pagination className="mt-4">
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))} />
              </PaginationItem>
              {[...Array(totalPages)].map((_, i) => (
                <PaginationItem key={i}>
                  <PaginationLink onClick={() => setCurrentPage(i + 1)} isActive={currentPage === i + 1}>
                    {i + 1}
                  </PaginationLink>
                </PaginationItem>
              ))}
              <PaginationItem>
                <PaginationNext onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))} />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </CardContent>
      </Card>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogTrigger asChild>
          <Button>Adicionar Novo Cliente</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Adicionar Novo Cliente</DialogTitle>
            <DialogDescription>
              Preencha os dados do novo cliente abaixo.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleAddClient}>
            <div className="space-y-4">
              <div>
                <Label htmlFor="name">Nome</Label>
                <Input
                  id="name"
                  value={newClient.name}
                  onChange={(e) => setNewClient({...newClient, name: e.target.value})}
                  required
                />
              </div>
              <div>
                <Label htmlFor="cpf">CPF</Label>
                <Input
                  id="cpf"
                  value={newClient.cpf}
                  onChange={(e) => setNewClient({...newClient, cpf: e.target.value})}
                  required
                />
              </div>
              <div>
                <Label htmlFor="phone">Telefone</Label>
                <Input
                  id="phone"
                  value={newClient.phone}
                  onChange={(e) => setNewClient({...newClient, phone: e.target.value})}
                  required
                />
              </div>
              <div>
                <Label htmlFor="amount">Valor da Primeira Compra</Label>
                <Input
                  id="amount"
                  type="number"
                  value={newClient.amount}
                  onChange={(e) => setNewClient({...newClient, amount: e.target.value})}
                  required
                />
              </div>
            </div>
            <DialogFooter className="mt-4">
              <Button type="submit">Adicionar Cliente</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  )
}