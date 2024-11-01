'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { toast } from "@/hooks/use-toast"
import { AlertCircle } from 'lucide-react'
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

export default function SettingsComponent() {
  const [companyName, setCompanyName] = useState('Minha Empresa')
  const [email, setEmail] = useState('contato@minhaempresa.com')
  const [subdomain, setSubdomain] = useState('minhaempresa')
  const [plan, setPlan] = useState('intermediate')
  const [emailNotifications, setEmailNotifications] = useState(true)
  const [darkMode, setDarkMode] = useState(false)

  const handleSaveGeneral = async () => {
    try {
      const response = await fetch('/api/settings/general', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          companyName,
          email,
          subdomain,
          darkMode,
        }),
      })

      if (!response.ok) {
        throw new Error('Falha ao salvar as configurações gerais')
      }

      toast({
        title: "Configurações salvas",
        description: "As configurações gerais foram atualizadas com sucesso.",
      })
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      toast({
        title: "Erro",
        description: "Ocorreu um erro ao salvar as configurações.",
        variant: "destructive",
      })
    }
  }

  const handleSaveNotifications = async () => {
    try {
      const response = await fetch('/api/settings/notifications', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          emailNotifications,
        }),
      })

      if (!response.ok) {
        throw new Error('Falha ao salvar as configurações de notificações')
      }

      toast({
        title: "Preferências salvas",
        description: "As configurações de notificações foram atualizadas com sucesso.",
      })
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      toast({
        title: "Erro",
        description: "Ocorreu um erro ao salvar as preferências de notificações.",
        variant: "destructive",
      })
    }
  }

  const handleUpdatePlan = async () => {
    try {
      const response = await fetch('/api/settings/plan', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          plan,
        }),
      })

      if (!response.ok) {
        throw new Error('Falha ao atualizar o plano')
      }

      toast({
        title: "Plano atualizado",
        description: `Seu plano foi atualizado para ${plan}.`,
      })
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      toast({
        title: "Erro",
        description: "Ocorreu um erro ao atualizar o plano.",
        variant: "destructive",
      })
    }
  }

  return (
    <div className="container mx-auto p-6">
      <Tabs defaultValue="general" className="space-y-6">
        <TabsList>
          <TabsTrigger value="general">Geral</TabsTrigger>
          <TabsTrigger value="notifications">Notificações</TabsTrigger>
          <TabsTrigger value="billing">Faturamento</TabsTrigger>
        </TabsList>

        <TabsContent value="general">
          <Card>
            <CardHeader>
              <CardTitle>Configurações Gerais</CardTitle>
              <CardDescription>Gerencie as configurações gerais da sua conta.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="companyName">Nome da Empresa</Label>
                <Input
                  id="companyName"
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">E-mail de Contato</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="subdomain">Subdomínio</Label>
                <Input
                  id="subdomain"
                  value={subdomain}
                  onChange={(e) => setSubdomain(e.target.value)}
                />
              </div>
              <div className="flex items-center space-x-2">
                <Switch
                  id="darkMode"
                  checked={darkMode}
                  onCheckedChange={setDarkMode}
                />
                <Label htmlFor="darkMode">Modo Escuro</Label>
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={handleSaveGeneral}>Salvar Alterações</Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="notifications">
          <Card>
            <CardHeader>
              <CardTitle>Configurações de Notificações</CardTitle>
              <CardDescription>Gerencie suas preferências de notificações.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center space-x-2">
                <Switch
                  id="emailNotifications"
                  checked={emailNotifications}
                  onCheckedChange={setEmailNotifications}
                />
                <Label htmlFor="emailNotifications">Receber notificações por e-mail</Label>
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={handleSaveNotifications}>Salvar Preferências</Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="billing">
          <Card>
            <CardHeader>
              <CardTitle>Informações de Faturamento</CardTitle>
              <CardDescription>Gerencie seu plano e informações de pagamento.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="plan">Plano Atual</Label>
                <Select value={plan} onValueChange={setPlan}>
                  <SelectTrigger id="plan">
                    <SelectValue placeholder="Selecione um plano" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="basic">Básico</SelectItem>
                    <SelectItem value="intermediate">Intermediário</SelectItem>
                    <SelectItem value="advanced">Avançado</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Alert>
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Atenção</AlertTitle>
                <AlertDescription>
                  Mudar de plano pode afetar suas funcionalidades e faturamento. Certifique-se de revisar as diferenças entre os planos antes de fazer a mudança.
                </AlertDescription>
              </Alert>
            </CardContent>
            <CardFooter>
              <Button onClick={handleUpdatePlan}>Atualizar Plano</Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}