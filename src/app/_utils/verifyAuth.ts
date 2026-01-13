import { NextRequest, NextResponse } from "next/server";
import { supabaseServer } from '@/app/_utils/supabaseServer' 

export const verifyAuth = async (request: NextRequest) => {

  // Authorization ヘッダー取得
  const authHeader = request.headers.get("authorization")
  if (!authHeader) {
    return NextResponse.json(
      { error: "Unauthorized" }, { status: 401 },
    );
  }

  // token 抽出
  const token = authHeader.replace("Bearer ", "")

  // token 検証
  const { data, error } = await supabaseServer.auth.getUser(token)
  if (error || !data.user) {
    return NextResponse.json(
      { error: "Unauthorized" }, { status: 401},
    );
  }

  console.log("supabase auth error:", error);

  return { user: data.user };
}