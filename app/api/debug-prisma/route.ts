import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const models = Object.keys(prisma).filter(k => !k.startsWith("_") && !k.startsWith("$"));
    const announcementExists = !!(prisma as any).announcement;
    
    return NextResponse.json({
      availableModels: models,
      announcementModelFound: announcementExists,
      prismaVersion: (prisma as any)._clientVersion,
      DATABASE_URL_DEFINED: !!process.env.DATABASE_URL,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
