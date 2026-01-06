// /api/timeline/start
import { NextRequest, NextResponse } from "next/server";
import { prisma } from '@/utils/prisma' ;
import { supabase } from '@/utils/supabase' 

// POST
export const POST = async (request: NextRequest ) => {
  // Authorization ヘッダー取得
  const authHeader = request.headers.get("authorization")
  if (!authHeader) {
    return NextResponse.json(
      { error: "Unauthorized" },
      { status: 401 },
    );
  }

  // token 抽出
  const token = authHeader.replace("Bearer ", "")

  // token 検証
  const { data, error } = await supabase.auth.getUser(token)
  if (error || !data.user) {
    return NextResponse.json(
      { error: "Unauthorized" },
      { status: 401},
    );
  }

  // profile 取得
  const profile = await prisma.profile.findUnique({
    where: { userId: data.user.id },
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

