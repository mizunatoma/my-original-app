// /api/timeline/running
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/app/_utils/prisma";
import { createServerClient } from "@supabase/ssr";
import { cookies } from 'next/headers';

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
// GET
// ===============================
export const GET = async (request: NextRequest) => {
  const cookieStore = cookies()
  const supabase = createSupabaseServer(cookieStore);

  const { data: { user } } = await supabase.auth.getUser()
  if (!user) {
    return NextResponse.json({ error: 'Unautorized' }, { status: 401 });
  };

  const profile = await prisma.profile.findUnique({
    where: { userId: user.id }
  })
  if (!profile) {
    return NextResponse.json({ error: 'Profile not found' }, { status: 400 })
  }

  const runningLog = await prisma.timeLog.findFirst({
    where: {
      endAt: null,
      activity: { profileId: profile.id }
    },
    include: {
      activity: true,
    }
  })

  if (!runningLog) {
    return NextResponse.json({ running: false });
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
  });
}
