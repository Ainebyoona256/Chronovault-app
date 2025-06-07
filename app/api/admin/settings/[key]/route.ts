export const dynamic = "force-dynamic"

import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { prisma } from '@/lib/prisma'

// PATCH /api/admin/settings/[key] - Update a setting
export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ key: string }> }
) {
  const { key } = await params;
  const session = await getServerSession()
  
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
      where: { key },
      data: {
        value,
        description,
        updatedAt: new Date()
      }
    })

    return NextResponse.json(setting)
  } catch (error) {
    console.error('Error updating setting:', error)
    return new NextResponse('Internal Server Error', { status: 500 })
  }
}

// DELETE /api/admin/settings/[key] - Delete a setting
export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ key: string }> }
) {
  const { key } = await params;
  const session = await getServerSession()
  
  if (!session) {
    return new NextResponse('Unauthorized', { status: 401 })
  }
  const user = session.user as (typeof session.user & { role?: string });
  if (!user || !['ADMIN', 'SUPER_ADMIN'].includes(user.role || '')) {
    return new NextResponse('Unauthorized', { status: 401 })
  }

  try {
    await prisma.settings.delete({
      where: { key }
    })

    return new NextResponse(null, { status: 204 })
  } catch (error) {
    console.error('Error deleting setting:', error)
    return new NextResponse('Internal Server Error', { status: 500 })
  }
} 