// /api/timeline/end
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
    return NextResponse.json({ error: 'Unautorized' }, { status: 401 });
  };

  const profile = await prisma.profile.findUnique({
    where: { userId: user.id }
  })
  if (!profile) {
    return NextResponse.json({ error: 'Profile not found' }, { status: 400 })
  }

  // 進行中のアクティビティを探す
  const runningLog = await prisma.timeLog.findFirst({
    where: {
      endAt: null,
      activity: { profileId: profile.id }
    }
  })
  if (!runningLog) {
    return NextResponse.json({ error: "runningLog not found" }, { status: 400 });
  };

  // 見つかった timelog の id を使って終了時間を更新
  const timeLog = await prisma.timeLog.update({
    where: { id: runningLog.id },
    data: { endAt: new Date() }
  });

  return NextResponse.json({ timeLog }, { status: 200 });
};

