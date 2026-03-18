// /api/todos/[todoId]
import { NextRequest, NextResponse } from "next/server";
import { prisma } from '@/app/_utils/prisma'
import { getAuthUser } from "@/app/_utils/getAuthUser";

// ===============================
// PUT
// ===============================
export const PUT = async (
  request: NextRequest,
  { params }: { params: { todoId: string } }
) => {
  try {
    const auth = await getAuthUser();
    if (auth instanceof NextResponse) return auth;
    const user = auth.user;

    const todo = await prisma.todo.findFirst({
      where: {
        id: params.todoId,
        todoList: { profile: { userId: user.id } }
      }
    })
    if (!todo) return NextResponse.json({ error: "No list found" }, { status: 403 })

    const { title, isDone } = await request.json();
    const updated = await prisma.todo.update({
      where: { id: params.todoId },
      data: {
        title,
        isDone,
        doneAt: isDone === true ? new Date() : null
      }
    })

    return NextResponse.json({ todo: updated }, { status: 200 })
  } catch (e) {
    console.error("PUT /api/todos/[todoId]:", e);
    return NextResponse.json({ error: String(e) }, { status: 500 })
  };
};

// ===============================
// DELETE
// ===============================
export const DELETE = async (
  request: NextRequest,
  { params }: { params: { todoId: string } }
) => {
  try {
    const auth = await getAuthUser();
    if (auth instanceof NextResponse) return auth;
    const user = auth.user;

    const todo = await prisma.todo.findFirst({
      where: {
        id: params.todoId,
        todoList: { profile: { userId: user.id } }
      }
    })
    if (!todo) return NextResponse.json({ error: "No list found" }, { status: 403 })

    await prisma.todo.update({
      where: { id: params.todoId },
      data: { deletedAt: new Date() }
    })

    return NextResponse.json(null, { status: 200 })
  } catch (e) {
    console.error("DELETE /api/todos/[todoId]:", e);
    return NextResponse.json({ error: String(e) }, { status: 500 })
  };
};
