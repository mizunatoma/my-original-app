// /api/timeline/start
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
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  };

  const profile = await prisma.profile.findUnique({
    where: { userId: user.id }
  })
  if (!profile) {
    return NextRequest.json({ error: 'profile not found' }, { status: 400 })
  }

  //endAt が null の timeLog を findFirst で探して、
  //見つかったら runningLog は truthy になる
  const runningLog = await prisma.timeLog.findFirst({
    where: {
      endAt: null,
      activity: { profileId: profile.id }
    }
  })

  if (runningLog) {
    return NextResponse.json({ error: "Already running" }, { status: 409 });
  };

  // activityId 取得
  const { activityId } = await request.json();

  // timeLog 作成
  const timeLog = await prisma.timeLog.create({
    data: {
      activityId,
      startAt: new Date()
    },
  });

  return NextResponse.json({ timeLog }, { status: 201 });
};

