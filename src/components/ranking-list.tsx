import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

type Client = {
  id: string
  name: string
  cpf: string
  totalSpent: number
  lastPurchase: string
}

export default function RankingList({ clients }: { clients: Client[] }) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[50px]">Pos.</TableHead>
          <TableHead>Cliente</TableHead>
          <TableHead>CPF</TableHead>
          <TableHead className="text-right">Total Gasto</TableHead>
          <TableHead className="text-right">Última Compra</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {clients.map((client, index) => (
          <TableRow key={client.id}>
            <TableCell className="font-medium">{index + 1}</TableCell>
            <TableCell>
              <div className="flex items-center">
                <Avatar className="h-8 w-8 mr-2">
                  <AvatarImage src={`https://api.dicebear.com/6.x/initials/svg?seed=${client.name}`} alt={client.name} />
                  <AvatarFallback>{client.name.charAt(0)}</AvatarFallback>
                </Avatar>
                {client.name}
              </div>
            </TableCell>
            <TableCell>{client.cpf}</TableCell>
            <TableCell className="text-right">R$ {client.totalSpent.toFixed(2)}</TableCell>
            <TableCell className="text-right">{new Date(client.lastPurchase).toLocaleDateString()}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}