// /api/profile
import { NextRequest, NextResponse } from "next/server";
import { prisma } from '@/utils/prisma';
import { supabase } from '@/utils/supabase'

export async function POST(request: NextRequest) {  // function 宣言 の記法
  console.log("Profile API: Start") // デバッグ用ログ

  // Authorization ヘッダー取得
  const authHeader = request.headers.get("authorization")
  console.log("authHeader:", authHeader)

  if (!authHeader) {
    console.log("Error: No Auth Header")
    return NextResponse.json(
      { error: "Unauthorized" }, { status: 401 },
    );
  }

  // token 抽出
  const token = authHeader.replace("Bearer ", "")
  console.log("token extracted")

  // token 検証
  const { data, error } = await supabase.auth.getUser(token)

  if (error || !data.user) {
    console.log("Supabase Auth Error:", error)
    return NextResponse.json(
      { error: "Unauthorized" }, { status: 401 }
    )
  }

  // ここで userId が確定する
  const userId = data.user.id
  console.log("User ID:", userId)

  // AuthUser を作成・更新しておく (FK制約回避)
  console.log("Upserting AuthUser...")
  await prisma.authUser.upsert({
    where: { id: userId },
    update: {},
    create: { id: userId }
  })
  console.log("AuthUser Upserted")

  console.log("Upserting Profile...")
  const profile = await prisma.profile.upsert({
    where: { userId: userId },
    update: {}, // あればなにもしない
    create: {   // なければ新規作成 
      userId: userId // displayName などは後で足す
    },
  });
  console.log("Profile Upserted:", profile)

  return NextResponse.json(
    { profile }, { status: 200 }
  )
}