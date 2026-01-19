// /api/timeline/start
import { NextRequest, NextResponse } from "next/server";
import { prisma } from '@/app/_utils/prisma';
import { getAuthUser } from "@/app/_utils/getAuthUser";

// ===============================
// POST
// ===============================
export const POST = async (request: NextRequest) => {
  try {
    const auth = await getAuthUser();
    if (auth instanceof NextResponse) return auth;
    const user = auth.user;

    const profile = await prisma.profile.findUnique({
      where: { userId: user.id }
    })
    if (!profile) {
      return NextResponse.json({ error: 'profile not found' }, { status: 400 })
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
  } catch (e) {
    console.error("POST /timeline/start error:", e);
    return NextResponse.json({ status: "NG", error: String(e) }, { status: 500 });
  }
};

