import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { uploadFile, deleteFile } from "@/lib/cloudinary";

export async function GET() {
  const session = await auth();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const leadership = await prisma.leadership.findMany({
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json(leadership);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  const session = await auth();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const formData = await req.formData();
    const name = formData.get("name") as string;
    const designation = formData.get("designation") as string;
    const bio = formData.get("bio") as string;
    const file = formData.get("file") as File;

    if (!name || !designation || !bio || !file) {
      return NextResponse.json({ error: "All fields are required." }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const uploadResult = await uploadFile(buffer, "leadership", "image");

    const entry = await prisma.leadership.create({
      data: {
        name,
        designation,
        bio,
        photoUrl: uploadResult.url,
        publicId: uploadResult.publicId,
      },
    });

    return NextResponse.json(entry, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function PATCH(req: NextRequest) {
  const session = await auth();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const formData = await req.formData();
    const id = formData.get("id") as string;
    const name = formData.get("name") as string;
    const designation = formData.get("designation") as string;
    const bio = formData.get("bio") as string;
    const file = formData.get("file") as File | null;

    if (!id) return NextResponse.json({ error: "ID is required" }, { status: 400 });

    const existing = await prisma.leadership.findUnique({ where: { id } });
    if (!existing) return NextResponse.json({ error: "Not found" }, { status: 404 });

    const data: any = { name, designation, bio };

    if (file && file.size > 0) {
      // Delete old photo
      if (existing.publicId) {
        await deleteFile(existing.publicId, "image");
      }

      // Upload new photo
      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);
      const uploadResult = await uploadFile(buffer, "leadership", "image");
      data.photoUrl = uploadResult.url;
      data.publicId = uploadResult.publicId;
    }

    const updated = await prisma.leadership.update({
      where: { id },
      data,
    });

    return NextResponse.json(updated);
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
    const entry = await prisma.leadership.findUnique({ where: { id } });
    if (!entry) return NextResponse.json({ error: "Not found" }, { status: 404 });

    if (entry.publicId) {
      await deleteFile(entry.publicId, "image");
    }
    await prisma.leadership.delete({ where: { id } });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
