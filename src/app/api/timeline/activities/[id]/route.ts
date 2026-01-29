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

    //console.log("=== API HIT ===");
    //console.log("params.id:", params.id);
    //console.log("user.id:", user.id);
    //console.log("DB URL:", process.env.DATABASE_URL);

    const activity = await prisma.activity.findFirst({
      where: {
        id: params.id,
        profile: { userId: user.id },
        deletedAt: null,
      },
    });
    if (!activity) {
      return NextResponse.json({ error: 'Not found' }, { status: 404 });
    }

    const { name } = await request.json();
    const updated = await prisma.activity.update({
      where: { id: params.id },
      data: { name },
    })

    return NextResponse.json({ activity: updated });
  } catch (e) {
    console.error("PUT /activities/[id] error:", e);
    return NextResponse.json({ error: String(e) }, { status: 500 });
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

    const activity = await prisma.activity.findFirst({
      where: {
        id: params.id,
        profile: { userId: user.id },
        deletedAt: null,
      },
    });
    if (!activity) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }

    await prisma.activity.update({
      where: { id: params.id },
      data: { deletedAt: new Date() },
    })

    return NextResponse.json({ activity }, { status: 200 });
  } catch (e) {
    console.error("DELETE /activities/[id] error:", e);
    return NextResponse.json({ error: String(e) }, { status: 500 });
  };
}