import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { prisma } from '@/lib/prisma'
import { authOptions } from '@/lib/auth'

export const dynamic = "force-dynamic"
export const runtime = 'edge'

// GET /api/admin/analytics - Get analytics data
export async function GET() {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session) {
      return new NextResponse('Unauthorized', { status: 401 })
    }

    const user = session.user as (typeof session.user & { role?: string });
    if (!user || !['ADMIN', 'SUPER_ADMIN'].includes(user.role || '')) {
      return new NextResponse('Unauthorized', { status: 401 })
    }

    // Wrap all database queries in a try-catch block
    try {
      const [
        totalUsers,
        totalContent,
        recentUsers,
        recentContent,
        userStats,
        contentStats,
        categoryStats,
        recentEvents
      ] = await Promise.all([
        prisma.user.count(),
        prisma.content.count(),
        prisma.user.findMany({
          take: 5,
          orderBy: { createdAt: 'desc' },
          select: {
            id: true,
            name: true,
            email: true,
            createdAt: true,
            role: true
          }
        }),
        prisma.content.findMany({
          take: 5,
          orderBy: { createdAt: 'desc' },
          select: {
            id: true,
            title: true,
            createdAt: true,
            author: {
              select: {
                name: true
              }
            }
          }
        }),
        prisma.user.groupBy({
          by: ['role'],
          _count: true
        }),
        prisma.content.groupBy({
          by: ['published'],
          _count: true
        }),
        prisma.content.groupBy({
          by: ['category'],
          _count: true
        }),
        prisma.analytics.findMany({
          take: 10,
          orderBy: { timestamp: 'desc' }
        })
      ])

      return NextResponse.json({
        totalUsers,
        totalContent,
        recentUsers,
        recentContent,
        userStats,
        contentStats,
        categoryStats,
        recentEvents
      })
    } catch (dbError) {
      console.error('Database query error:', dbError)
      return new NextResponse('Error fetching analytics data', { status: 500 })
    }
  } catch (error) {
    console.error('Analytics error:', error)
    return new NextResponse('Internal Server Error', { status: 500 })
  }
}

// POST /api/admin/analytics - Log an analytics event
export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user) {
      return new NextResponse('Unauthorized', { status: 401 })
    }

    try {
      const body = await request.json()
      const { event, data } = body

      const analyticsEvent = await prisma.analytics.create({
        data: {
          event,
          data,
          timestamp: new Date()
        }
      })

      return NextResponse.json(analyticsEvent)
    } catch (dbError) {
      console.error('Database query error:', dbError)
      return new NextResponse('Error creating analytics event', { status: 500 })
    }
  } catch (error) {
    console.error('Analytics error:', error)
    return new NextResponse('Internal Server Error', { status: 500 })
  }
} 