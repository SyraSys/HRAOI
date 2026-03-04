import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { uploadFile, deleteFile } from "@/lib/cloudinary";

export async function GET() {
  const session = await auth();
  if (!session)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const certificates = await prisma.certificate.findMany({
    orderBy: { createdAt: "desc" },
  });
  return NextResponse.json(certificates);
}

export async function POST(req: NextRequest) {
  const session = await auth();
  if (!session)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const formData = await req.formData();
    const certificateNumber = formData.get("certificateNumber") as string;
    const file = formData.get("file") as File;
    const idCardFile = formData.get("idCard") as File | null;

    if (!certificateNumber || !file) {
      return NextResponse.json(
        { error: "Certificate number and file are required." },
        { status: 400 }
      );
    }

    // Check if certificate number already exists
    const existing = await prisma.certificate.findUnique({
      where: { certificateNumber },
    });

    if (existing) {
      return NextResponse.json(
        { error: "Certificate number already exists" },
        { status: 409 }
      );
    }

    // Upload Certificate
    const certificateBytes = await file.arrayBuffer();
    const certificateBuffer = Buffer.from(certificateBytes);
    const certUploadResult = await uploadFile(certificateBuffer, "certificates", "auto");

    // Upload ID Card if provided
    let idCardUrl = null;
    let idCardPublicId = null;

    if (idCardFile && idCardFile.size > 0) {
      const idCardBytes = await idCardFile.arrayBuffer();
      const idCardBuffer = Buffer.from(idCardBytes);
      const idCardUploadResult = await uploadFile(idCardBuffer, "certificates", "auto");
      idCardUrl = idCardUploadResult.url;
      idCardPublicId = idCardUploadResult.publicId;
    }

    const certificate = await prisma.certificate.create({
      data: {
        certificateNumber,
        fileUrl: certUploadResult.url,
        publicId: certUploadResult.publicId,
        idCardUrl,
        idCardPublicId,
      },
    });

    return NextResponse.json(certificate, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function DELETE(req: NextRequest) {
  const session = await auth();
  if (!session)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const { id } = await req.json();
    const certificate = await prisma.certificate.findUnique({ where: { id } });
    if (!certificate)
      return NextResponse.json({ error: "Not found" }, { status: 404 });

    // Delete Certificate from Cloudinary
    await deleteFile(certificate.publicId, "auto");
    
    // Delete ID Card from Cloudinary if it exists
    if (certificate.idCardPublicId) {
      await deleteFile(certificate.idCardPublicId, "auto");
    }

    await prisma.certificate.delete({ where: { id } });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
