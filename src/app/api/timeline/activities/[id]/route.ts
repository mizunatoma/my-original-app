// /api/timeline/activities/[id]
import { NextRequest, NextResponse } from "next/server";
import { prisma } from '@/app/_utils/prisma' ;

// ===============================
// PUT
// ===============================
export const PUT = async (
  request: NextRequest,
  { params }: { params: { id: string } }
) => {
  const { id } = params;
  const body = await request.json();
  const { name } = body;

  try {
    const activity = await prisma.activity.update({
      where: { id },
      data: { name },
    });

    return NextResponse.json(
      { status: "OK", activity },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { status: "NG", error: String(error) },
      { status: 400 }
    );
  };
}

// ===============================
// DELETE
// ===============================
export const DELETE = async (
  request: NextRequest,
  { params }: { params: { id: string } }
) => {
  const { id } = params;

  try {
    const activity = await prisma.activity.update({
      where: { id },
      data: { deletedAt: new Date() },
    });
    
    return NextResponse.json(
      { status: "OK", activity },
      { status: 200 },
    );
  } catch (error) {
    return NextResponse.json(
      { status: "NG", error: String(error) },
      { status: 400 }
    );
  };
}