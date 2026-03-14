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
    if (auth instanceof NextResponse) return auth; // instanceof は「この値は○○の種類か？」を確認する構文
    const user = auth.user;

    const todoList = await prisma.todoList.findMany({
      where: {
        profile: { userId: user.id },
        deletedAt: null,
      },
    })

    return NextResponse.json({ todoList }, { status: 200 })
  } catch (e) {
    console.error("GET /api/todo-list:", e);
    return NextResponse.json({ error: String(e) }, { status: 500 }) // 500＝サーバー側で予期しないエラーが起きた
  };
};

// ===============================
// POST
// ===============================