// /api/timeline/running
import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/app/_utils/prisma'
import { getAuthUser } from '@/app/_utils/getAuthUser'

// ===============================
// GET
// ===============================
export const GET = async (request: NextRequest) => {
  try {
    const auth = await getAuthUser()
    if (auth instanceof NextResponse) return auth
    const user = auth.user

    const runningLog = await prisma.timeLog.findFirst({
      where: {
        endAt: null,
        activity: { profile: { userId: user.id }, deletedAt: null },
      },
      include: {
        activity: true,
      },
    })

    if (!runningLog) {
      return NextResponse.json({ running: false })
    }

    return NextResponse.json({
      running: true,
      log: {
        id: runningLog.id,
        activityId: runningLog.activityId,
        activityName: runningLog.activity.name,
        colorToken: runningLog.activity.colorToken,
        startAt: runningLog.startAt,
      },
    })
  } catch (e) {
    console.error('GET /timeline/running error:', e)
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 },
    )
  }
}
