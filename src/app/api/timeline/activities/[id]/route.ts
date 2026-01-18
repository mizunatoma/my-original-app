// /api/timeline/activities/[id]
import { NextRequest, NextResponse } from "next/server";
import { prisma } from '@/app/_utils/prisma';
import { cookies } from 'next/headers'
import { createServerClient } from '@supabase/ssr'

function createSupabaseServer(cookieStore: ReturnType<typeof cookies>) {
  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get: (name) => cookieStore.get(name)?.value,
        set: (name, value, options) =>
          cookieStore.set({ name, value, ...options }),
        remove: (name, options) =>
          cookieStore.set({ name, value: '', ...options }),
      },
    }
  )
}

// ===============================
// PUT
// ===============================
export const PUT = async (
  request: NextRequest,
  { params }: { params: { id: string } }
) => {
  try {
    const cookieStore = cookies()
    const supabase = createSupabaseServer(cookieStore);

    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const profile = await prisma.profile.findUnique({
      where: { userId: user.id },
    });
    if (!profile) {
      return NextResponse.json({ error: 'Profile not find' }, { status: 400 });
    }

    const activity = await prisma.activity.findUnique({
      where: { id: params.id },
    });
    if (!activity || activity.profileId !== profile.id) {
      return NextResponse.json({ error: 'Not find' }, { status: 404 });
    }

    const { name } = await request.json();
    const updated = await prisma.activity.update({
      where: { id: params.id },
      data: { name },
    })

    return NextResponse.json({ status: "OK", activity: updated });
  } catch (e) {
    return NextResponse.json({ status: "NG", error: String(e) }, { status: 500 });
  };
}

// ===============================
// DELETE
// ===============================
export const DELETE = async (
  request: NextRequest,
  { params }: { params: { id: string } }
) => {
  try {
    const cookieStore = cookies();
    const supabase = createSupabaseServer(cookieStore);

    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const profile = await prisma.profile.findUnique({
      where: { userId: user.id },
    });
    if (!profile) {
      return NextResponse.json({ error: "Profile not found" }, { status: 400 });
    }

    const activity = await prisma.activity.findUnique({
      where: { id: params.id },
    });
    if (!activity || activity.profileId !== profile.id) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }

    await prisma.activity.delete({
      where: { id: params.id },
    })

    return NextResponse.json({ status: "OK", activity }, { status: 200 });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ status: "NG", error: String(e) }, { status: 500 });
  };
}