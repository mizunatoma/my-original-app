// /api/timeline/activities
import { NextRequest, NextResponse } from "next/server";
import { prisma } from '@/app/_utils/prisma';
import { getAuthUser } from "@/app/_utils/getAuthUser";

// ===============================
// GET
// ===============================
export const GET = async () => {
  try {
    const auth = await getAuthUser();
    if (auth instanceof NextResponse) return auth;
    const user = auth.user;

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
    return NextResponse.json({ status: "NG", error: String(e) }, { status: 500 });
  }
};

// ===============================
// POST
// ===============================
export const POST = async (request: NextRequest) => {
  try {
    const auth = await getAuthUser();
    if (auth instanceof NextResponse) return auth;
    const user = auth.user;

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
    return NextResponse.json({ status: "NG", error: String(e) }, { status: 500 });
  }
};

