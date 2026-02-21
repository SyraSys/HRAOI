import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  console.log("Public Announcement GET called");
  try {
    const announcements = await prisma.announcement.findMany({
      orderBy: { date: "desc" },
    });
    return NextResponse.json(announcements);
  } catch (error: any) {
    console.error("Fetch announcements error details:", error.message || error);
    return NextResponse.json({ error: error.message || "Internal server error" }, { status: 500 });
  }
}
