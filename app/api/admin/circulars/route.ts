import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { uploadFile, deleteFile } from "@/lib/cloudinary";

export async function GET() {
  const session = await auth();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const circulars = await prisma.circular.findMany({
    orderBy: { date: "desc" },
  });
  return NextResponse.json(circulars);
}

export async function POST(req: NextRequest) {
  const session = await auth();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const formData = await req.formData();
    const title = formData.get("title") as string;
    const date = formData.get("date") as string;
    const file = formData.get("file") as File;

    if (!title || !file) {
      return NextResponse.json({ error: "Title and file are required." }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const uploadResult = await uploadFile(buffer, "circulars", "raw");

    const circular = await prisma.circular.create({
      data: {
        title,
        fileUrl: uploadResult.url,
        publicId: uploadResult.publicId,
        date: date ? new Date(date) : new Date(),
      },
    });

    return NextResponse.json(circular, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  const session = await auth();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const { id } = await req.json();
    const circular = await prisma.circular.findUnique({ where: { id } });
    if (!circular) return NextResponse.json({ error: "Not found" }, { status: 404 });

    await deleteFile(circular.publicId, "raw");
    await prisma.circular.delete({ where: { id } });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
