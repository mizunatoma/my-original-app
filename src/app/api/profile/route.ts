// /api/profile
import { NextRequest, NextResponse } from "next/server";
import { prisma } from '@/app/_utils/prisma';
import { getAuthUser } from "@/app/_utils/getAuthUser";
import { ProfileAPI } from "@/types/api";

// ===============================
// POST
// ===============================
export const POST = async (request: NextRequest) => {
  const auth = await getAuthUser();
  if (auth instanceof NextResponse) return auth;
  const user = auth.user;

  try {
    const profile = await prisma.profile.upsert({
      where: { userId: user.id },
      update: {},
      create: { userId: user.id },
    })

    return NextResponse.json({ profile }, { status: 200 })
  } catch (e) {
    console.error("POST /profile error:", e);
    return NextResponse.json({ status: "NG", error: String(e) }, { status: 500 });
  }
}

// ===============================
// GET
// ===============================
export const GET = async (request: NextRequest) => {
  try {
    const auth = await getAuthUser();
    if (auth instanceof NextResponse) return auth;
    const user = auth.user;

    const profile = await prisma.profile.findUnique({
      where: { userId: user.id },
    })

    return NextResponse.json({ profile }, { status: 200 })
  } catch (e) {
    console.error("GET /profile error:", e);
    return NextResponse.json({ status: "NG", error: String(e) }, { status: 500 });
  }
}

// ===============================
// PUT
// ===============================
export const PUT = async (request: NextRequest) => {
  try {
    const auth = await getAuthUser();
    if (auth instanceof NextResponse) return auth;
    const user = auth.user;

    const body = (await request.json()) as ProfileAPI.Put.Request;
    const { displayName } = body

    const profile = await prisma.profile.update({
      where: { userId: user.id },
      data: { displayName },
    })

    return NextResponse.json({ profile }, { status: 200 })
  } catch (e) {
    console.error("PUT /profile error:", e);
    return NextResponse.json({ status: "NG", error: String(e) }, { status: 500 });
  }
}




