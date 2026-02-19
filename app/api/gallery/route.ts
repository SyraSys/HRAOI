import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const photos = await prisma.photoGallery.findMany({
      orderBy: { uploadedAt: "desc" },
    });
    return NextResponse.json(photos);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
