// src/app/api/clients/route.ts
import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

export async function POST(request: Request) {
  try {
    const { name, cpf, amount, companyId } = await request.json()
    const date = new Date()

    const client = await prisma.client.upsert({
      where: { cpf },
      update: {
        lastPurchase: date,
        totalSpent: { increment: amount },
      },
      create: {
        name,
        cpf,
        lastPurchase: date,
        totalSpent: amount,
        companyId,
      },
    })

    return NextResponse.json(client)
  } catch (error) {
    return NextResponse.json({ error: 'An error occurred while processing your request' + error }, { status: 500 })
  }
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const companyId = searchParams.get('companyId')

  if (!companyId) {
    return NextResponse.json({ error: 'Company ID is required' }, { status: 400 })
  }

  try {
    const clients = await prisma.client.findMany({
      where: { companyId },
      orderBy: { totalSpent: 'desc' },
    })
    return NextResponse.json(clients)
  } catch (error) {
    return NextResponse.json({ error: 'An error occurred while fetching clients' + error }, { status: 500 })
  }
}