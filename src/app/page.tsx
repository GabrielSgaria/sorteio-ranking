import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { ArrowRight, BarChart2, Users, Award } from 'lucide-react'

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <header className="bg-white border-b border-blue-100">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-blue-800">RankingOnline</h1>
          <nav>
            <ul className="flex space-x-4">
              <li><Link href="#features" className="text-blue-600 hover:text-blue-800">Recursos</Link></li>
              <li><Link href="#pricing" className="text-blue-600 hover:text-blue-800">Preços</Link></li>
              <li><Link href="/login" className="text-blue-600 hover:text-blue-800">Login</Link></li>
            </ul>
          </nav>
        </div>
      </header>

      <main className="flex-grow">
        <section className="bg-gradient-to-b from-blue-100 to-white py-20">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-4xl font-bold mb-4 text-blue-800">Crie rankings personalizados para sua empresa</h2>
            <p className="text-xl text-blue-600 mb-8">
              Acompanhe o desempenho de vendas, engajamento de clientes e muito mais com nossa plataforma de ranking.
            </p>
            <Button size="lg" className="bg-blue-500 hover:bg-blue-600 text-white" asChild>
              <Link href="/signup">
                Comece agora <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </section>

        <section id="features" className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12 text-blue-800">Recursos</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-blue-50 p-6 rounded-lg shadow-md">
                <BarChart2 className="h-12 w-12 text-blue-500 mb-4" />
                <h3 className="text-xl font-semibold mb-2 text-blue-800">Rankings em tempo real</h3>
                <p className="text-blue-600">Atualizações instantâneas para manter todos motivados e informados.</p>
              </div>
              <div className="bg-blue-50 p-6 rounded-lg shadow-md">
                <Users className="h-12 w-12 text-blue-500 mb-4" />
                <h3 className="text-xl font-semibold mb-2 text-blue-800">Personalização avançada</h3>
                <p className="text-blue-600">Adapte os rankings às necessidades específicas da sua empresa.</p>
              </div>
              <div className="bg-blue-50 p-6 rounded-lg shadow-md">
                <Award className="h-12 w-12 text-blue-500 mb-4" />
                <h3 className="text-xl font-semibold mb-2 text-blue-800">Gamificação integrada</h3>
                <p className="text-blue-600">Incentive a competição saudável e aumente o engajamento.</p>
              </div>
            </div>
          </div>
        </section>

        <section id="pricing" className="py-20 bg-blue-50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12 text-blue-800">Planos e Preços</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-white rounded-lg p-6 shadow-md">
                <h3 className="text-xl font-semibold mb-2 text-blue-800">Básico</h3>
                <p className="text-3xl font-bold mb-4 text-blue-600">R$59,90<span className="text-sm font-normal">/mês</span></p>
                <ul className="mb-6 space-y-2 text-blue-600">
                  <li>Até 50 registros</li>
                  <li>Atualização a cada hora</li>
                  <li>Exportação em CSV</li>
                </ul>
                <Button className="w-full bg-blue-500 hover:bg-blue-600 text-white">Escolher plano</Button>
              </div>
              <div className="bg-blue-500 rounded-lg p-6 shadow-md text-white transform scale-105">
                <h3 className="text-xl font-semibold mb-2">Intermediário</h3>
                <p className="text-3xl font-bold mb-4">R$189,90<span className="text-sm font-normal">/mês</span></p>
                <ul className="mb-6 space-y-2">
                  <li>Até 250 registros</li>
                  <li>Atualização em tempo real</li>
                  <li>Exportação em CSV e PDF</li>
                  <li>Painel administrativo avançado</li>
                </ul>
                <Button className="w-full bg-white hover:bg-blue-100 text-blue-500">Escolher plano</Button>
              </div>
              <div className="bg-white rounded-lg p-6 shadow-md">
                <h3 className="text-xl font-semibold mb-2 text-blue-800">Avançado</h3>
                <p className="text-3xl font-bold mb-4 text-blue-600">R$259,90<span className="text-sm font-normal">/mês</span></p>
                <ul className="mb-6 space-y-2 text-blue-600">
                  <li>Registros ilimitados</li>
                  <li>Atualização em tempo real</li>
                  <li>Exportação em CSV e PDF</li>
                  <li>Painel administrativo avançado</li>
                  <li>Suporte prioritário</li>
                </ul>
                <Button className="w-full bg-blue-500 hover:bg-blue-600 text-white">Escolher plano</Button>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-blue-800 py-8 text-white">
        <div className="container mx-auto px-4 text-center">
          <p>&copy; 2024 RankingOnline. Todos os direitos reservados.</p>
        </div>
      </footer>
    </div>
  )
}