// /api/profile
import { NextRequest, NextResponse } from "next/server";
import { prisma } from '@/utils/prisma';
import { verifyAuth } from "@/utils/verifyAuth";

// ===============================
// POST
// ===============================
export const POST = async (request: NextRequest) => {  
  // verifyAuthユーティリティ
  const authResult = await verifyAuth(request);
  // 失敗 authResult = NextResponse(401など)
  if (authResult instanceof NextResponse) return authResult;
  // 成功 authResult = { user }
  const userId = authResult.user.id;

  // AuthUser を作成・更新しておく (FK制約回避)
  console.log("Upserting AuthUser...")
  await prisma.authUser.upsert({
    where: { id: userId },
    update: {},
    create: { id: userId }
  })
  console.log("AuthUser Upserted") // デバッグ用ログ

  console.log("Upserting Profile...") // デバッグ用ログ
  const profile = await prisma.profile.upsert({
    where: { id: userId },
    update: {}, // あればなにもしない
    create: {   // なければ新規作成 
      userId: userId // displayName などは後で足す
    },
  });
  console.log("Profile Upserted:", profile) // デバッグ用ログ

  return NextResponse.json(
    { profile }, { status: 200 }
  )
}
  
// ===============================
// GET
// ===============================
export const GET = async (request: NextRequest) => {
  const authResult = await verifyAuth(request);
  if (authResult instanceof NextResponse) return authResult;
  const userId = authResult.user.id;

  const profile = await prisma.profile.findUnique({
    where: { userId },
  });

  return NextResponse.json(
    { profile }, { status: 200 }
  )
}

// ===============================
// PUT
// ===============================
export const PUT = async (request: NextRequest) => {
  // ヘッダー tokenで認証 → userIdを受け取る
  const authResult = await verifyAuth(request);
  if (authResult instanceof NextResponse) return authResult;
  const userId = authResult.user.id;

  // request.body から displayName を取り出す
  const body = await request.json();
  const { displayName } = body;

  // profile を update する
  const profile = await prisma.profile.update({
    where: { userId },
    data: { displayName },
    },
  );

  return NextResponse.json(
    { profile }, { status: 200 }
  );
}



