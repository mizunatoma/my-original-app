// /api/todo-lists
import { NextRequest, NextResponse } from "next/server";
import { prisma } from '@/app/_utils/prisma'
import { getAuthUser } from "@/app/_utils/getAuthUser";

// ===============================
// GET
// ===============================
export const GET = async (request: NextRequest) => {
  try {
    const auth = await getAuthUser();
    if (auth instanceof NextResponse) return auth;
    const user = auth.user;

    const todoLists = await prisma.todoList.findMany({
      where: {
        profile: { userId: user.id },
        deletedAt: null,
      },
    })

    return NextResponse.json({ todoLists }, { status: 200 })
  } catch (e) {
    console.error("GET /api/todo-list:", e);
    return NextResponse.json({ error: String(e) }, { status: 500 }) // 500＝サーバー側で予期しないエラーが起きた
  };
};

// ===============================
// POST
// ===============================
export const POST = async (request: NextRequest) => {
  try {
    const auth = await getAuthUser()
    if (auth instanceof NextResponse) return auth;
    const user = auth.user;

    const profile = await prisma.profile.findFirst({
      where: {
        userId: user.id
      }
    })

    if (!profile) {
      return NextResponse.json({ error: "Authorization failure" }, { status: 403 });
    }
    const { name } = await request.json();

    const todoList = await prisma.todoList.create({
      data: {
        name,
        profileId: profile.id,
        sortOrder: 0,
      },
    });

    return NextResponse.json({ todoList }, { status: 201 }); // 201=成功(新規作成)
  } catch (e) {
    console.error("POST /api/todo-list error:", e);
    return NextResponse.json({ error: String(e) }, { status: 500 })
  }
}














