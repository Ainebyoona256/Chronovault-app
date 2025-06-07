export const dynamic = "force-dynamic"

import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { prisma } from '@/lib/prisma'

// GET /api/admin/users - List all users
export async function GET() {
  const session = await getServerSession()
  if (!session) {
    return new NextResponse('Unauthorized', { status: 401 })
  }
  const user = session.user as (typeof session.user & { role?: string });
  if (!user || !['ADMIN', 'SUPER_ADMIN'].includes(user.role || '')) {
    return new NextResponse('Unauthorized', { status: 401 })
  }

  try {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        createdAt: true,
      },
      orderBy: {
        createdAt: 'desc'
      }
    })

    return NextResponse.json(users)
  } catch (error) {
    console.error('Error fetching users:', error)
    return new NextResponse('Internal Server Error', { status: 500 })
  }
}

// POST /api/admin/users - Create a new user
export async function POST(request: Request) {
  const session = await getServerSession()
  if (!session) {
    return new NextResponse('Unauthorized', { status: 401 })
  }
  const user = session.user as (typeof session.user & { role?: string });
  if (!user || user.role !== 'SUPER_ADMIN') {
    return new NextResponse('Unauthorized', { status: 401 })
  }

  try {
    const body = await request.json()
    const { email, name, role, password } = body

    const existingUser = await prisma.user.findUnique({
      where: { email }
    })

    if (existingUser) {
      return new NextResponse('User already exists', { status: 400 })
    }

    const user = await prisma.user.create({
      data: {
        email,
        name,
        role,
        password // Note: In production, hash the password before storing
      },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        createdAt: true
      }
    })

    return NextResponse.json(user)
  } catch (error) {
    console.error('Error creating user:', error)
    return new NextResponse('Internal Server Error', { status: 500 })
  }
} 