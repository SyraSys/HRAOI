import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET() {
  console.log("Announcement GET called");
  const session = await auth();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const announcements = await prisma.announcement.findMany({
      orderBy: { date: "desc" },
    });
    return NextResponse.json(announcements);
  } catch (error: any) {
    console.error("Admin Fetch announcements error:", error.message || error);
    return NextResponse.json({ error: error.message || "Internal server error" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  console.log("Announcement POST called");
  const session = await auth();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const { title, description, date } = await req.json();

    if (!title || !description) {
      return NextResponse.json({ error: "Title and description are required." }, { status: 400 });
    }

    const announcement = await prisma.announcement.create({
      data: {
        title,
        description,
        date: date ? new Date(date) : new Date(),
      },
    });

    return NextResponse.json(announcement, { status: 201 });
  } catch (error: any) {
    console.error("Admin Create announcement error:", error.message || error);
    return NextResponse.json({ error: error.message || "Internal server error" }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  const session = await auth();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const { id } = await req.json();
    await prisma.announcement.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error("Admin Delete announcement error:", error.message || error);
    return NextResponse.json({ error: error.message || "Internal server error" }, { status: 500 });
  }
}
