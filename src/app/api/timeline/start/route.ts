// /api/timeline/start
import { NextRequest, NextResponse } from "next/server";
import { prisma } from '@/app/_utils/prisma' ;
import { verifyAuth } from "@/app/_utils/verifyAuth";

// ===============================
// POST
// ===============================
export const POST = async (request: NextRequest ) => {
  // verifyAuthユーティリティ
  const authResult = await verifyAuth(request);
  // 失敗 authResult = NextResponse(401など)
  if (authResult instanceof NextResponse) return authResult;
  // 成功 authResult = { user }
  const userId = authResult.user.id;

  // profile 取得
  const profile = await prisma.profile.findUnique({
    where: { userId },
  })

  if (!profile) {
    return NextResponse.json(
      { error: "Profile not found" }, 
      { status: 400 },
    );
  }

  //endAt が null の timeLog を findFirst で探して、
  //見つかったら runningLog は truthy になる
  const runningLog = await prisma.timeLog.findFirst({
    where: {
      endAt: null,
      activity: {
        profileId: profile.id
      }
    }
  })

  if (runningLog) {
    return NextResponse.json(
      { error: "Already running" }, 
      { status: 409 },
    );
  } 

  // body 取得
  const body = await request.json();
  const { activityId } = body;

  // timeLog 作成
  const timeLog = await prisma.timeLog.create({
    data: {
      activityId,
      startAt: new Date()
    },
  });

  return NextResponse.json(
    { timeLog },
    { status: 201}
  );
};

