import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const circulars = await prisma.circular.findMany({
      orderBy: { date: "desc" },
    });
    return NextResponse.json(circulars);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
