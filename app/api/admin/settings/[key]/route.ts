export const dynamic = "force-dynamic"
export const runtime = 'edge'

import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { prisma } from '@/lib/prisma'
import { authOptions } from '@/lib/auth'

// GET /api/admin/settings/[key] - Get a setting
export async function GET(
  request: Request,
  { params }: { params: { key: string } }
) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session) {
      return new NextResponse('Unauthorized', { status: 401 })
    }

    const user = session.user as (typeof session.user & { role?: string });
    if (!user || !['ADMIN', 'SUPER_ADMIN'].includes(user.role || '')) {
      return new NextResponse('Unauthorized', { status: 401 })
    }

    try {
      const setting = await prisma.settings.findUnique({
        where: { key: params.key }
      })

      if (!setting) {
        return new NextResponse('Setting not found', { status: 404 })
      }

      return NextResponse.json(setting)
    } catch (dbError) {
      console.error('Database query error:', dbError)
      return new NextResponse('Error fetching setting', { status: 500 })
    }
  } catch (error) {
    console.error('Settings error:', error)
    return new NextResponse('Internal Server Error', { status: 500 })
  }
}

// PATCH /api/admin/settings/[key] - Update a setting
export async function PATCH(
  request: Request,
  { params }: { params: { key: string } }
) {
  try {
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
      const { value, description } = body

      const setting = await prisma.settings.update({
        where: { key: params.key },
        data: {
          value,
          description,
          updatedAt: new Date()
        }
      })

      return NextResponse.json(setting)
    } catch (dbError) {
      console.error('Database query error:', dbError)
      return new NextResponse('Error updating setting', { status: 500 })
    }
  } catch (error) {
    console.error('Settings error:', error)
    return new NextResponse('Internal Server Error', { status: 500 })
  }
}

// DELETE /api/admin/settings/[key] - Delete a setting
export async function DELETE(
  request: Request,
  { params }: { params: { key: string } }
) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session) {
      return new NextResponse('Unauthorized', { status: 401 })
    }

    const user = session.user as (typeof session.user & { role?: string });
    if (!user || user.role !== 'SUPER_ADMIN') {
      return new NextResponse('Unauthorized', { status: 401 })
    }

    try {
      await prisma.settings.delete({
        where: { key: params.key }
      })

      return new NextResponse(null, { status: 204 })
    } catch (dbError) {
      console.error('Database query error:', dbError)
      return new NextResponse('Error deleting setting', { status: 500 })
    }
  } catch (error) {
    console.error('Settings error:', error)
    return new NextResponse('Internal Server Error', { status: 500 })
  }
} 