export const dynamic = "force-dynamic"

import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { prisma } from '@/lib/prisma'
import { authOptions } from '@/lib/auth'

// GET /api/admin/analytics - Get analytics data
export async function GET(request: Request) {
  const session = await getServerSession(authOptions)
  
  if (!session) {
    return new NextResponse('Unauthorized', { status: 401 })
  }
  const user = session.user as (typeof session.user & { role?: string });
  if (!user || !['ADMIN', 'SUPER_ADMIN'].includes(user.role || '')) {
    return new NextResponse('Unauthorized', { status: 401 })
  }

  try {
    const { searchParams } = new URL(request.url)
    const timeRange = searchParams.get('timeRange') || '7d'
    
    // Calculate the start date based on the time range
    const now = new Date()
    const startDate = new Date(now)
    switch (timeRange) {
      case '24h':
        startDate.setHours(startDate.getHours() - 24)
        break
      case '7d':
        startDate.setDate(startDate.getDate() - 7)
        break
      case '30d':
        startDate.setDate(startDate.getDate() - 30)
        break
      case '90d':
        startDate.setDate(startDate.getDate() - 90)
        break
      default:
        startDate.setDate(startDate.getDate() - 7)
    }

    // Get total users
    const totalUsers = await prisma.user.count()

    // Get total content
    const totalContent = await prisma.content.count({
      where: { published: true }
    })

    // Get active users (users who have content or analytics events in the time range)
    const activeUsers = await prisma.user.count({
      where: {
        OR: [
          {
            contents: {
              some: {
                updatedAt: {
                  gte: startDate
                }
              }
            }
          }
        ]
      }
    })

    // Get popular categories
    const popularCategories = await prisma.content.groupBy({
      by: ['category'],
      _count: {
        category: true
      },
      where: {
        published: true,
        updatedAt: {
          gte: startDate
        }
      },
      orderBy: {
        _count: {
          category: 'desc'
        }
      },
      take: 5
    })

    // Get recent events
    const recentEvents = await prisma.analytics.findMany({
      where: {
        timestamp: {
          gte: startDate
        }
      },
      orderBy: {
        timestamp: 'desc'
      },
      take: 10
    })

    return NextResponse.json({
      totalUsers,
      totalContent,
      activeUsers,
      popularCategories: popularCategories.map(cat => ({
        category: cat.category,
        count: cat._count.category
      })),
      recentEvents
    })
  } catch (error) {
    console.error('Error fetching analytics:', error)
    return new NextResponse('Internal Server Error', { status: 500 })
  }
}

// POST /api/admin/analytics - Log an analytics event
export async function POST(request: Request) {
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
  } catch (error) {
    console.error('Error logging analytics event:', error)
    return new NextResponse('Internal Server Error', { status: 500 })
  }
} 