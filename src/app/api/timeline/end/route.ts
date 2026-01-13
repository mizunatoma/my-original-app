// /api/timeline/end
import { NextRequest, NextResponse } from "next/server";
import { prisma } from '@/app/_utils/prisma' ;
import { verifyAuth } from "@/app/_utils/verifyAuth";

// ===============================
// POST
// ===============================
export const POST = async (request: NextRequest ) => {
  // 認証・userId取得
  const authResult = await verifyAuth(request);
  if (authResult instanceof NextResponse) return authResult;
  const userId = authResult.user.id;

  // profile 取得
  const profile = await prisma.profile.findUnique({
    where: { userId },
  })

  if (!profile) {
    return NextResponse.json(
      { error: "Profile not found" }, { status: 400 },
    );
  }

  // 進行中のアクティビティを探す
  const runningLog = await prisma.timeLog.findFirst({
    where: {
      endAt: null,
      activity: {
        profileId: profile.id
      }
    }
  })

    if (!runningLog) {
    return NextResponse.json(
      { error: "runningLog not found" }, { status: 400 },
    );
  }

  // 見つかった timelog の id を使って終了時間を更新
  const timeLog = await prisma.timeLog.update({
    where: { id: runningLog.id },
    data: { endAt: new Date()}
  });

  return NextResponse.json(
    { timeLog }, { status: 200}
  );
};

