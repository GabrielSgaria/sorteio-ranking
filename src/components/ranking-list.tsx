
type Client = {
  id: string
  name: string
  cpf: string
  totalSpent: number
  lastPurchase: Date
}

export default function RankingList({ clients }: { clients: Client[] }) {
  if (!clients) return <div>Carregando...</div>

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Ranking</h2>
      <table className="min-w-full bg-white">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b">Posição</th>
            <th className="py-2 px-4 border-b">Nome</th>
            <th className="py-2 px-4 border-b">CPF</th>
            <th className="py-2 px-4 border-b">Total Gasto</th>
            <th className="py-2 px-4 border-b">Última Compra</th>
          </tr>
        </thead>
        <tbody>
          {clients.map((client, index) => (
            <tr key={client.id}>
              <td className="py-2 px-4 border-b">{index + 1}</td>
              <td className="py-2 px-4 border-b">{client.name}</td>
              <td className="py-2 px-4 border-b">{client.cpf}</td>
              <td className="py-2 px-4 border-b">R$ {client.totalSpent.toFixed(2)}</td>
              <td className="py-2 px-4 border-b">{new Date(client.lastPurchase).toLocaleDateString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}