import { useState } from 'react'
import { Medal, ChevronDown } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card } from "@/components/ui/card"

type Participant = {
  id: string
  name: string
  score: number
  avatar?: string
}

// This would typically come from your API
const participants: Participant[] = [
  { id: '1', name: 'João Silva', score: 1500, avatar: '/placeholder.svg?height=100&width=100' },
  { id: '2', name: 'Maria Santos', score: 1450, avatar: '/placeholder.svg?height=100&width=100' },
  { id: '3', name: 'Pedro Oliveira', score: 1400, avatar: '/placeholder.svg?height=100&width=100' },
  { id: '4', name: 'Ana Rodrigues', score: 1350 },
  { id: '5', name: 'Carlos Ferreira', score: 1300 },
  { id: '6', name: 'Lúcia Pereira', score: 1250 },
  { id: '7', name: 'Marcos Almeida', score: 1200 },
  { id: '8', name: 'Sofia Costa', score: 1150 },
  // ... more participants
]

export default function RankingPage() {
  const [showAll, setShowAll] = useState(false)
  const displayedParticipants = showAll ? participants : participants.slice(0, 8)

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-100 to-white">
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-center mb-12">Ranking de Vendas</h1>
        
        <div className="grid grid-cols-3 gap-4 mb-12">
          {[participants[1], participants[0], participants[2]].map((participant, index) => (
            <Card key={participant.id} className={`${index === 1 ? 'col-span-1 transform scale-110 z-10' : 'col-span-1'} flex flex-col items-center justify-center p-6 bg-white shadow-lg rounded-lg transition-all duration-300 hover:shadow-xl`}>
              <div className="relative">
                <Avatar className={`w-24 h-24 ${index === 1 ? 'w-32 h-32' : ''} border-4 ${index === 0 ? 'border-silver' : index === 1 ? 'border-gold' : 'border-bronze'}`}>
                  <AvatarImage src={participant.avatar} alt={participant.name} />
                  <AvatarFallback>{participant.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <Medal className={`absolute -top-2 -right-2 w-8 h-8 ${index === 0 ? 'text-silver' : index === 1 ? 'text-gold' : 'text-bronze'}`} />
              </div>
              <h2 className="mt-4 text-xl font-semibold">{participant.name}</h2>
              <p className="text-lg font-bold text-blue-600">{participant.score} pts</p>
              <p className={`text-sm ${index === 0 ? 'text-silver' : index === 1 ? 'text-gold' : 'text-bronze'}`}>
                {index === 0 ? '2º Lugar' : index === 1 ? '1º Lugar' : '3º Lugar'}
              </p>
            </Card>
          ))}
        </div>

        <div className="bg-white shadow-md rounded-lg overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Posição</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nome</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Pontuação</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {displayedParticipants.slice(3).map((participant, index) => (
                <tr key={participant.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{index + 4}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <div className="flex items-center">
                      <Avatar className="w-8 h-8 mr-3">
                        <AvatarImage src={participant.avatar} alt={participant.name} />
                        <AvatarFallback>{participant.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      {participant.name}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{participant.score} pts</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {!showAll && participants.length > 8 && (
          <div className="mt-6 text-center">
            <Button
              variant="outline"
              onClick={() => setShowAll(true)}
              className="inline-flex items-center"
            >
              Ver mais <ChevronDown className="ml-2 h-4 w-4" />
            </Button>
          </div>
        )}
      </main>
    </div>
  )
}