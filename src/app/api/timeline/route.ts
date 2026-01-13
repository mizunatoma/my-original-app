// GET /api/timeline?date=YYYY-MM-DD
import { NextRequest, NextResponse } from "next/server";

export const GET = async (request: NextRequest) => {
  const { searchParams } = new URL(request.url); // リクエストのURL文字列を URLオブジェクトに変換
  const date = searchParams.get("date");         // "2026-01-01" or null

  return NextResponse.json({
      status: "OK",
      date,
      message: "timeline api is alive",
    },
    { status: 200 }
  );
};