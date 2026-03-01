import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { uploadFile, deleteFile } from "@/lib/cloudinary";

export async function GET() {
  const session = await auth();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const photos = await prisma.photoGallery.findMany({
    orderBy: { uploadedAt: "desc" },
  });
  return NextResponse.json(photos);
}

export async function POST(req: NextRequest) {
  const session = await auth();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const formData = await req.formData();
    const title = formData.get("title") as string;
    const event = formData.get("event") as string;
    const file = formData.get("file") as File;

    if (!title || !event || !file) {
      return NextResponse.json({ error: "Title, event, and file are required." }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const uploadResult = await uploadFile(buffer, "gallery", "image");

    const photo = await prisma.photoGallery.create({
      data: {
        title,
        event,
        imageUrl: uploadResult.url,
        publicId: uploadResult.publicId,
      },
    });

    return NextResponse.json(photo, { status: 201 });
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
    const photo = await prisma.photoGallery.findUnique({ where: { id } });
    if (!photo) return NextResponse.json({ error: "Not found" }, { status: 404 });

    await deleteFile(photo.publicId, "image");
    await prisma.photoGallery.delete({ where: { id } });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
