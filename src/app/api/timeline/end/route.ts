// /api/timeline/end
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
  } catch (e) {
    console.error("POST /timeline/end error:", e);
    return NextResponse.json({ error: String(e) }, { status: 500 });
  }
};

