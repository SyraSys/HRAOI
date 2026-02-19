import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import cloudinary from "@/lib/cloudinary";

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

    const uploadResult = await new Promise<{ secure_url: string; public_id: string }>(
      (resolve, reject) => {
        cloudinary.uploader.upload_stream(
          { folder: "hraoi/gallery", resource_type: "image" },
          (error, result) => {
            if (error || !result) reject(error);
            else resolve(result as { secure_url: string; public_id: string });
          }
        ).end(buffer);
      }
    );

    const photo = await prisma.photoGallery.create({
      data: {
        title,
        event,
        imageUrl: uploadResult.secure_url,
        publicId: uploadResult.public_id,
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

    await cloudinary.uploader.destroy(photo.publicId);
    await prisma.photoGallery.delete({ where: { id } });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
