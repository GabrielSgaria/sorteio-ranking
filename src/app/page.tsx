import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { ArrowRight, BarChart2, Users, Award } from 'lucide-react'

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="bg-background border-b">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-primary">RankingOnline</h1>
          <nav>
            <ul className="flex space-x-4">
              <li><Link href="#features" className="text-muted-foreground hover:text-primary">Recursos</Link></li>
              <li><Link href="#pricing" className="text-muted-foreground hover:text-primary">Preços</Link></li>
              <li><Link href="/login" className="text-muted-foreground hover:text-primary">Login</Link></li>
            </ul>
          </nav>
        </div>
      </header>

      <main className="flex-grow">
        <section className="bg-background py-20">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-4xl font-bold mb-4">Crie rankings personalizados para sua empresa</h2>
            <p className="text-xl text-muted-foreground mb-8">
              Acompanhe o desempenho de vendas, engajamento de clientes e muito mais com nossa plataforma de ranking.
            </p>
            <Button size="lg" asChild>
              <Link href="/signup">
                Comece agora <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </section>

        <section id="features" className="py-20 bg-secondary">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">Recursos</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-background p-6 rounded-lg shadow-md">
                <BarChart2 className="h-12 w-12 text-primary mb-4" />
                <h3 className="text-xl font-semibold mb-2">Rankings em tempo real</h3>
                <p className="text-muted-foreground">Atualizações instantâneas para manter todos motivados e informados.</p>
              </div>
              <div className="bg-background p-6 rounded-lg shadow-md">
                <Users className="h-12 w-12 text-primary mb-4" />
                <h3 className="text-xl font-semibold mb-2">Personalização avançada</h3>
                <p className="text-muted-foreground">Adapte os rankings às necessidades específicas da sua empresa.</p>
              </div>
              <div className="bg-background p-6 rounded-lg shadow-md">
                <Award className="h-12 w-12 text-primary mb-4" />
                <h3 className="text-xl font-semibold mb-2">Gamificação integrada</h3>
                <p className="text-muted-foreground">Incentive a competição saudável e aumente o engajamento.</p>
              </div>
            </div>
          </div>
        </section>

        <section id="pricing" className="py-20">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">Planos e Preços</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="border rounded-lg p-6">
                <h3 className="text-xl font-semibold mb-2">Básico</h3>
                <p className="text-3xl font-bold mb-4">R$59,90<span className="text-sm font-normal">/mês</span></p>
                <ul className="mb-6 space-y-2">
                  <li>Até 50 registros</li>
                  <li>Atualização a cada hora</li>
                  <li>Exportação em CSV</li>
                </ul>
                <Button className="w-full" variant="outline">Escolher plano</Button>
              </div>
              <div className="border rounded-lg p-6 bg-primary text-primary-foreground">
                <h3 className="text-xl font-semibold mb-2">Intermediário</h3>
                <p className="text-3xl font-bold mb-4">R$189,90<span className="text-sm font-normal">/mês</span></p>
                <ul className="mb-6 space-y-2">
                  <li>Até 250 registros</li>
                  <li>Atualização em tempo real</li>
                  <li>Exportação em CSV e PDF</li>
                  <li>Painel administrativo avançado</li>
                </ul>
                <Button className="w-full">Escolher plano</Button>
              </div>
              <div className="border rounded-lg p-6">
                <h3 className="text-xl font-semibold mb-2">Avançado</h3>
                <p className="text-3xl font-bold mb-4">R$259,90<span className="text-sm font-normal">/mês</span></p>
                <ul className="mb-6 space-y-2">
                  <li>Registros ilimitados</li>
                  <li>Atualização em tempo real</li>
                  <li>Exportação em CSV e PDF</li>
                  <li>Painel administrativo avançado</li>
                  <li>Suporte prioritário</li>
                </ul>
                <Button className="w-full" variant="outline">Escolher plano</Button>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-background border-t py-8">
        <div className="container mx-auto px-4 text-center text-muted-foreground">
          <p>&copy; 2024 RankingOnline. Todos os direitos reservados.</p>
        </div>
      </footer>
    </div>
  )
}