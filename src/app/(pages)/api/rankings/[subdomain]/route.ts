// src/app/api/rankings/[subdomain]/route.ts
import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

export async function GET(request: Request, { params }: { params: { subdomain: string } }) {
    try {
        const company = await prisma.company.findUnique({
            where: { subdomain: params.subdomain },
            include: {
                clients: {
                    orderBy: { totalSpent: 'desc' },
                },
            },
        })

        if (!company) {
            return NextResponse.json({ error: 'Company not found' }, { status: 404 })
        }

        return NextResponse.json(company.clients)
    } catch (error) {
        return NextResponse.json({ error: 'An error occurred while fetching the ranking' + error }, { status: 500 })
    }
}