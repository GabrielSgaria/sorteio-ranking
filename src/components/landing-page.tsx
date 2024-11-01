import Link from 'next/link'

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-900">RankingOnline</h1>
        </div>
      </header>
      <main>
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <div className="px-4 py-6 sm:px-0">
            <h2 className="text-2xl font-semibold text-gray-900">Crie rankings personalizados para sua empresa</h2>
            <p className="mt-2 text-gray-600">
              Acompanhe o desempenho de vendas, engajamento de clientes e muito mais com nossa plataforma de ranking.
            </p>
            <div className="mt-8">
              <Link href="/dashboard" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                Comece agora
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}