import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

export async function POST(request: Request) {
  try {
    const { name, subdomain } = await request.json()

    const company = await prisma.company.create({
      data: { name, subdomain },
    })

    return NextResponse.json(company)
  } catch (error) {
    return NextResponse.json({ error: 'An error occurred while creating the company' + error }, { status: 500 })
  }
}