export const dynamic = "force-dynamic"

import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { prisma } from '@/lib/prisma'
import { authOptions } from '@/lib/auth'

// GET /api/admin/settings - List all settings
export async function GET() {
  const session = await getServerSession(authOptions)
  if (!session) {
    return new NextResponse('Unauthorized', { status: 401 })
  }
  const user = session.user as (typeof session.user & { role?: string });
  if (!user || !['ADMIN', 'SUPER_ADMIN'].includes(user.role || '')) {
    return new NextResponse('Unauthorized', { status: 401 })
  }

  try {
    const settings = await prisma.settings.findMany({
      orderBy: {
        key: 'asc'
      }
    })

    return NextResponse.json(settings)
  } catch (error) {
    console.error('Error fetching settings:', error)
    return new NextResponse('Internal Server Error', { status: 500 })
  }
}

// POST /api/admin/settings - Create a new setting
export async function POST(request: Request) {
  const session = await getServerSession(authOptions)
  if (!session) {
    return new NextResponse('Unauthorized', { status: 401 })
  }
  const user = session.user as (typeof session.user & { role?: string });
  if (!user || !['ADMIN', 'SUPER_ADMIN'].includes(user.role || '')) {
    return new NextResponse('Unauthorized', { status: 401 })
  }

  try {
    const body = await request.json()
    const { key, value, description } = body

    const existingSetting = await prisma.settings.findUnique({
      where: { key }
    })

    if (existingSetting) {
      return new NextResponse('Setting already exists', { status: 400 })
    }

    const setting = await prisma.settings.create({
      data: {
        key,
        value,
        description
      }
    })

    return NextResponse.json(setting)
  } catch (error) {
    console.error('Error creating setting:', error)
    return new NextResponse('Internal Server Error', { status: 500 })
  }
} 