// /api/timeline?date=YYYY-MM-DD
import { NextRequest, NextResponse } from "next/server";
import { prisma } from '@/app/_utils/prisma';
import { getAuthUser } from "@/app/_utils/getAuthUser";

export const GET = async (request: NextRequest) => {
  try {
    const auth = await getAuthUser();
    if (auth instanceof NextResponse) return auth;
    const user = auth.user;

    // user に紐づく profile を取得
    const profile = await prisma.profile.findUnique({
      where: { userId: user.id },
    })
    if (!profile) {
      return NextResponse.json({ error: "Profile not found" }, { status: 400 });
    }

    // クエリパラメータから date を取得
    const { searchParams } = new URL(request.url); // リクエストのURL文字列を URLオブジェクトに変換
    const date = searchParams.get("date");         // "2026-01-01" or null
    if (!date) {
      return NextResponse.json({ error: "date is required" }, { status: 400 });
    }

    // 指定日の開始・終了時刻（UTC）
    const startOfDay = new Date(`${date}T00:00:00.000Z`); //
    const endOfDay = new Date(`${date}T23:59:59.999Z`)    //

    // TimeLog を Activity → Profile 経由で取得
    const logs = await prisma.timeLog.findMany({
      where: {
        activity: {
          profileId: profile.id,
        },
        OR: [
          { startAt: { gte: startOfDay, lte: endOfDay } },
          { endAt: { gte: startOfDay, lte: endOfDay } },
          { endAt: null }, // 実行中ログ
        ],
      },
      include: {
        activity: {
          select: { id: true, name: true },
        },
      },
      orderBy: { startAt: "asc" },
    });

    const timeline = logs.map(log => ({
      id: log.id,
      type: "timelog",
      activityId: log.activity.id,
      activityName: log.activity.name,
      startAt: log.startAt,
      endAt: log.endAt,
    }));

    return NextResponse.json({ date, timeline }, { status: 200 })
  } catch (e) {
    console.error(e);
    return NextResponse.json({ status: "NG", error: String(e) }, { status: 500 })
  };
};