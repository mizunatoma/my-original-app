// /api/timeline/running
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/app/_utils/prisma";
import { getAuthUser } from "@/app/_utils/getAuthUser";

// ===============================
// GET
// ===============================
export const GET = async (request: NextRequest) => {
  const auth = await getAuthUser();
  if (auth instanceof NextResponse) return auth;
  const user = auth.user;

  const profile = await prisma.profile.findUnique({
    where: { userId: user.id }
  })
  if (!profile) {
    return NextResponse.json({ error: 'Profile not found' }, { status: 400 })
  }

  const runningLog = await prisma.timeLog.findFirst({
    where: {
      endAt: null,
      activity: {
        profileId: profile.id,
        deletedAt: null,
      }
    },
    include: {
      activity: true,
    }
  })

  if (!runningLog) {
    return NextResponse.json({ running: false });
  }

  return NextResponse.json({
    running: true,
    log: {
      id: runningLog.id,
      activityId: runningLog.activityId,
      activityName: runningLog.activity.name,
      colorToken: runningLog.activity.colorToken,
      startAt: runningLog.startAt,
    },
  });
}
