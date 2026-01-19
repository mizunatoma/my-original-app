// /api/timeline/activities/[id]
import { NextRequest, NextResponse } from "next/server";
import { prisma } from '@/app/_utils/prisma';
import { getAuthUser } from "@/app/_utils/getAuthUser";

// ===============================
// PUT
// ===============================
export const PUT = async (
  request: NextRequest,
  { params }: { params: { id: string } }
) => {
  try {
    const auth = await getAuthUser();
    if (auth instanceof NextResponse) return auth;
    const user = auth.user;

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
    console.error("PUT /activities/[id] error:", e);
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
    const auth = await getAuthUser();
    if (auth instanceof NextResponse) return auth;
    const user = auth.user;

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

    await prisma.activity.update({
      where: { id: params.id },
      data: { deletedAt: new Date() },
    })

    return NextResponse.json({ status: "OK", activity }, { status: 200 });
  } catch (e) {
    console.error("DELETE /activities/[id] error:", e);
    return NextResponse.json({ status: "NG", error: String(e) }, { status: 500 });
  };
}