// /api/timeline/activities
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
// GET
// ===============================
export const GET = async () => {
  try {
    const cookieStore = cookies();
    const supabase = createSupabaseServer(cookieStore);

    const { data: { user }, error } = await supabase.auth.getUser();
    if (error || !user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const profile = await prisma.profile.findUnique({
      where: { userId: user.id },
    });
    if (!profile) {
      return NextResponse.json({ error: "Profile not found" }, { status: 400 });
    }

    const activities = await prisma.activity.findMany({
      where: { profileId: profile.id },
      select: { id: true, name: true },
    });

    return NextResponse.json({ status: "OK", activities }, { status: 200 });
  } catch (e) {
    console.error("GET /activities error:", e);
    return NextResponse.json(
      { status: "NG", error: String(e) }, { status: 500 }
    );
  }
};

// ===============================
// POST
// ===============================
export const POST = async (request: NextRequest) => {
  try {
    const cookieStore = cookies();
    const supabase = createSupabaseServer(cookieStore);

    const { data: { user }, error } = await supabase.auth.getUser();
    if (error || !user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const profile = await prisma.profile.findUnique({
      where: { userId: user.id },
    });
    if (!profile) {
      return NextResponse.json({ error: "Profile not found" }, { status: 400 });
    }

    const { name } = await request.json();
    if (!name) {
      return NextResponse.json({ error: "name is required" }, { status: 400 });
    }

    const data = await prisma.activity.create({
      data: { name, profileId: profile.id },
    });

    return NextResponse.json(
      { status: "OK", id: data.id }, { status: 200 }
    );
  } catch (e) {
    console.error("POST /activities error:", e);
    return NextResponse.json(
      { status: "NG", error: String(e) }, { status: 500 }
    );
  }
};

