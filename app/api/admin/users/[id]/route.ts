export const dynamic = "force-dynamic"

import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { prisma } from '@/lib/prisma'
import { authOptions } from '@/lib/auth'

// GET /api/admin/users/[id] - Get user details
export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const session = await getServerSession(authOptions)
  
  if (!session) {
    return new NextResponse('Unauthorized', { status: 401 })
  }
  const user = session.user as (typeof session.user & { role?: string });
  if (!user || !['ADMIN', 'SUPER_ADMIN'].includes(user.role || '')) {
    return new NextResponse('Unauthorized', { status: 401 })
  }

  try {
    const user = await prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        createdAt: true,
        updatedAt: true,
        _count: {
          select: {
            contents: true
          }
        }
      }
    })

    if (!user) {
      return new NextResponse('User not found', { status: 404 })
    }

    return NextResponse.json(user)
  } catch (error) {
    console.error('Error fetching user:', error)
    return new NextResponse('Internal Server Error', { status: 500 })
  }
}

// PATCH /api/admin/users/[id] - Update user
export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const session = await getServerSession(authOptions)
  
  if (!session) {
    return new NextResponse('Unauthorized', { status: 401 })
  }
  const user = session.user as (typeof session.user & { role?: string });
  if (!user || user.role !== 'SUPER_ADMIN') {
    return new NextResponse('Unauthorized', { status: 401 })
  }

  try {
    const body = await request.json()
    const { role } = body

    const updatedUser = await prisma.user.update({
      where: { id },
      data: { role },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        createdAt: true,
        updatedAt: true
      }
    })

    return NextResponse.json(updatedUser)
  } catch (error) {
    console.error('Error updating user:', error)
    return new NextResponse('Internal Server Error', { status: 500 })
  }
}

// DELETE /api/admin/users/[id] - Delete user
export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const session = await getServerSession(authOptions)
  
  if (!session) {
    return new NextResponse('Unauthorized', { status: 401 })
  }
  const user = session.user as (typeof session.user & { role?: string });
  if (!user || user.role !== 'SUPER_ADMIN') {
    return new NextResponse('Unauthorized', { status: 401 })
  }

  try {
    await prisma.user.delete({
      where: { id }
    })

    return new NextResponse(null, { status: 204 })
  } catch (error) {
    console.error('Error deleting user:', error)
    return new NextResponse('Internal Server Error', { status: 500 })
  }
} 