import { NextRequest, NextResponse } from "next/server";
import { supabase } from '@/utils/supabase' 

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
  const { data, error } = await supabase.auth.getUser(token)
  if (error || !data.user) {
    return NextResponse.json(
      { error: "Unauthorized" }, { status: 401},
    );
  }

  return { user: data.user };
}