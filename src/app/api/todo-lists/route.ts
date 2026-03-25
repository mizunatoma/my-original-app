// /api/todo-lists
import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/app/_utils/prisma'
import { getAuthUser } from '@/app/_utils/getAuthUser'
import { TodoListsAPI } from '@/types/api'

// ===============================
// GET
// ===============================
export const GET = async (request: NextRequest) => {
  try {
    const auth = await getAuthUser()
    if (auth instanceof NextResponse) return auth
    const user = auth.user

    const todosLists = await prisma.todoList.findMany({
      where: {
        profile: { userId: user.id },
        deletedAt: null,
      },
      orderBy: {
        sortOrder: 'asc',
      },
    })

    const todoLists = todosLists.map((todoList) => ({
      id: todoList.id,
      profileId: todoList.profileId,
      name: todoList.name,
      sortOrder: todoList.sortOrder,
      createdAt: todoList.createdAt.toISOString(),
      updatedAt: todoList.updatedAt.toISOString(),
    }))

    return NextResponse.json<TodoListsAPI.Get.Response>(
      { todoLists },
      { status: 200 },
    )
  } catch (e) {
    console.error('GET /api/todo-lists:', e)
    return NextResponse.json({ error: String(e) }, { status: 500 }) // 500＝サーバー側で予期しないエラーが起きた
  }
}

// ===============================
// POST
// ===============================
export const POST = async (request: NextRequest) => {
  try {
    const auth = await getAuthUser()
    if (auth instanceof NextResponse) return auth
    const user = auth.user

    const profile = await prisma.profile.findFirst({
      where: {
        userId: user.id,
      },
    })

    if (!profile) {
      return NextResponse.json(
        { error: 'Authorization failure' },
        { status: 403 },
      )
    }
    const { name } = await request.json()

    const todoList = await prisma.todoList.create({
      data: {
        name,
        profileId: profile.id,
        sortOrder: 0,
      },
    })

    const mapped = {
      id: todoList.id,
      profileId: todoList.profileId,
      name: todoList.name,
      sortOrder: todoList.sortOrder,
      createdAt: todoList.createdAt.toISOString(),
      updatedAt: todoList.updatedAt.toISOString(),
    }

    return NextResponse.json<TodoListsAPI.Post.Response>(
      { todoList: mapped },
      { status: 201 },
    ) // 201=成功(新規作成)
  } catch (e) {
    console.error('POST /api/todo-list error:', e)
    return NextResponse.json({ error: String(e) }, { status: 500 })
  }
}
