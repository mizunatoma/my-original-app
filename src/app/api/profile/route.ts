// /api/profile
import { NextRequest, NextResponse } from "next/server";
import { prisma } from '@/app/_utils/prisma';
import { createServerClient } from "@supabase/ssr";
import { cookies } from 'next/headers'

function createSupabaseServer(cookieStore: ReturnType<typeof cookies>) {
  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get: (name) => cookieStore.get(name)?.value,
        set: (name, value, options) => cookieStore.set({ name, value, ...options }),
        remove: (name, options) => cookieStore.set({ name, value: '', ...options }),
      },
    }
  )
}

// ===============================
// POST
// ===============================
export const POST = async (request: NextRequest) => {
  const cookieStore = cookies()
  const supabase = createSupabaseServer(cookieStore)
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  try {
    const profile = await prisma.profile.upsert({
      where: { userId: user.id },
      update: {},
      create: { userId: user.id },
    })

    return NextResponse.json({ profile }, { status: 200 })
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: 'Profile upsert failed' }, { status: 500 })
  }
}

// ===============================
// GET
// ===============================
export const GET = async (request: NextRequest) => {
  const cookieStore = cookies()
  const supabase = createSupabaseServer(cookieStore)
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const profile = await prisma.profile.findUnique({
    where: { userId: user.id },
  })

  return NextResponse.json({ profile }, { status: 200 })
}

// ===============================
// PUT
// ===============================
export const PUT = async (request: NextRequest) => {
  const cookieStore = cookies()
  const supabase = createSupabaseServer(cookieStore)
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const body = await request.json()
  const { displayName } = body

  const profile = await prisma.profile.update({
    where: { userId: user.id },
    data: { displayName },
  })

  return NextResponse.json({ profile }, { status: 200 })
}




