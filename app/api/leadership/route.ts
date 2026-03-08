import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const leadership = await prisma.leadership.findMany({
      orderBy: { createdAt: "asc" },
    });
    return NextResponse.json(leadership);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
