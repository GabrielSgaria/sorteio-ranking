import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

export async function POST(request: NextRequest) {
  try {
    const { name, cpf, amount, companyId, phone } = await request.json()
    
    if (!name || !cpf || !amount || !companyId || !phone) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    const date = new Date()
    const numericAmount = parseFloat(amount)

    if (isNaN(numericAmount)) {
      return NextResponse.json({ error: 'Invalid amount' }, { status: 400 })
    }

    const client = await prisma.client.upsert({
      where: { cpf_companyId: { cpf, companyId } },
      update: {
        lastPurchase: date,
        totalSpent: { increment: numericAmount },
      },
      create: {
        name,
        cpf,
        phone,
        lastPurchase: date,
        totalSpent: numericAmount,
        companyId,
      },
    })

    return NextResponse.json(client)
  } catch (error) {
    console.error('Error in POST /api/clients:', error)
    return NextResponse.json({ error: 'An error occurred while processing your request' }, { status: 500 })
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const companyId = searchParams.get('companyId')
    const search = searchParams.get('search') || ''
    const page = parseInt(searchParams.get('page') || '1')
    const pageSize = 10 // You can make this configurable if needed

    if (!companyId) {
      return NextResponse.json({ error: 'Company ID is required' }, { status: 400 })
    }

    const where = {
      companyId,
      OR: [
        { name: { contains: search, mode: 'insensitive' as const } },
        { cpf: { contains: search } },
      ],
    }

    const [clients, totalCount] = await Promise.all([
      prisma.client.findMany({
        where,
        orderBy: { totalSpent: 'desc' },
        skip: (page - 1) * pageSize,
        take: pageSize,
      }),
      prisma.client.count({ where }),
    ])

    const totalPages = Math.ceil(totalCount / pageSize)

    return NextResponse.json({
      clients,
      totalPages,
      currentPage: page,
      totalCount,
    })
  } catch (error) {
    console.error('Error in GET /api/clients:', error)
    return NextResponse.json({ error: 'An error occurred while fetching clients' }, { status: 500 })
  }
}