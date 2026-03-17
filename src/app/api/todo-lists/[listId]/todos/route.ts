// /api/todo-lists/[listId]/todos
import { NextRequest, NextResponse } from "next/server";
import { prisma } from '@/app/_utils/prisma'
import { getAuthUser } from "@/app/_utils/getAuthUser";

// ===============================
// GET
// ===============================
export const GET = async (
  request: NextRequest,
  { params }: { params: { listId: string } }
) => {
  try {
    const auth = await getAuthUser();
    if (auth instanceof NextResponse) return auth;
    const user = auth.user;

    const { listId } = params;
    //console.log("listId:", listId);
    //console.log("userId:", user.id);

    // リストの存在確認と所有権チェック
    const todoList = await prisma.todoList.findFirst({
      where: {
        id: params.listId,
        profile: { userId: user.id }
      }
    })
    //console.log("todoList:", todoList);

    if (!todoList) return NextResponse.json({ error: "No list found" }, { status: 403 })

    const todos = await prisma.todo.findMany({
      where: {
        todoListId: listId,
        deletedAt: null,
      },
    })

    return NextResponse.json({ todos }, { status: 200 })
  } catch (e) {
    console.error("GET /api/todo-lists/[listId]/todos:", e);
    return NextResponse.json({ error: String(e) }, { status: 500 })
  };
};

// ===============================
// POST
// ===============================