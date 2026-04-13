// /api/profile
import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/app/_utils/prisma'
import { getAuthUser } from '@/app/_utils/getAuthUser'
import type {
  GetProfileResponse,
  UpdateProfileRequest,
  UpdateProfileResponse,
} from '@/types/api'

// ===============================
// GET
// ===============================
export const GET = async (request: NextRequest) => {
  try {
    const auth = await getAuthUser()
    if (auth instanceof NextResponse) return auth
    const user = auth.user

    const profile = await prisma.profile.findUnique({
      where: { userId: user.id },
    })
    if (!profile)
      return NextResponse.json({ error: 'Not found' }, { status: 404 })

    const response: GetProfileResponse = {
      profile: {
        id: profile.id,
        displayName: profile.displayName,
      },
    }

    return NextResponse.json(response, { status: 200 })
  } catch (e) {
    console.error('GET /profile error:', e)
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 },
    )
  }
}

// ===============================
// PUT
// ===============================
export const PUT = async (request: NextRequest) => {
  try {
    const auth = await getAuthUser()
    if (auth instanceof NextResponse) return auth
    const user = auth.user

    const body = (await request.json()) as UpdateProfileRequest // 型アサーションのため、実行時チェックはない
    const { displayName } = body

    const profile = await prisma.profile.update({
      where: { userId: user.id },
      data: { displayName },
    })

    const response: UpdateProfileResponse = {
      profile: {
        id: profile.id,
        displayName: profile.displayName,
      },
    }

    return NextResponse.json(response, { status: 200 })
  } catch (e) {
    console.error('PUT /profile error:', e)
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 },
    )
  }
}

// ===============================
// POST
// ===============================
export const POST = async (request: NextRequest) => {
  const auth = await getAuthUser()
  if (auth instanceof NextResponse) return auth
  const user = auth.user

  try {
    const profile = await prisma.profile.upsert({
      where: { userId: user.id },
      update: {},
      create: { userId: user.id },
    })

    const response: UpdateProfileResponse = {
      profile: {
        id: profile.id,
        displayName: profile.displayName,
      },
    }

    return NextResponse.json(response, { status: 200 })
  } catch (e) {
    console.error('POST /profile error:', e)
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 },
    )
  }
}
