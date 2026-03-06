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

    const activities = await prisma.activity.findMany({
      where: {
        profile: { userId: user.id },
        deletedAt: null,
      },
      select: {
        id: true, name: true
      },
    });

    return NextResponse.json({ activities }, { status: 200 });
  } catch (e) {
    console.error("GET /activities error:", e);
    return NextResponse.json({ error: String(e) }, { status: 500 });
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

    const { name, colorToken } = await request.json();
    if (!name) {
      return NextResponse.json({ error: "name is required" }, { status: 400 });
    }

    const data = await prisma.activity.create({
      data: {
        name,
        colorToken,
        profile: { connect: { userId: user.id } }
      },
    });

    return NextResponse.json({ id: data.id }, { status: 200 });
  } catch (e) {
    console.error("POST /activities error:", e);
    return NextResponse.json({ error: String(e) }, { status: 500 });
  }
};

