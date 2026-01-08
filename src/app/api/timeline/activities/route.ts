// /api/timeline/activities
import { NextRequest, NextResponse } from "next/server";
import { prisma } from '@/app/_utils/prisma' ;

// ===============================
// GET
// ===============================
export const GET = async (request: NextRequest) => {
  try {
    const activities = await prisma.activity.findMany({
      select: {
        id: true,
        name: true,
      },
    });

    return NextResponse.json(
      { status: 'OK', activities }, 
      { status: 200}
    );
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json(
        { status: "NG", error: String(error) },
        { status: 400}
      )
    }
  }
}

// ===============================
// POST
// ===============================
export interface CreateActivityRequwstBody {
  name: string
  profileId: string
}

export const POST = async (request: NextRequest) => {
  try {
    const body: CreateActivityRequwstBody = await request.json();
    const { name, profileId } = body;

    const data = await prisma.activity.create({
      data: { name, profileId }
    })

    // console.log("request body:", body);
    // console.log("created data:", data);

    return NextResponse.json(
      { status: 'OK', message: '作成しました', id: data.id }, 
      { status: 200 } 
    )
  } catch (error) {
  if ( error instanceof Error) {
      return NextResponse.json(
        { status: "NG", error: String(error) },
        { status: 400 }
      )
    }
  }
}