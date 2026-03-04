import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { uploadFile } from "@/lib/cloudinary";

export async function POST(req: NextRequest) {
  const session = await auth();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const formData = await req.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Using "donation" folder for QR codes
    const uploadResult = await uploadFile(buffer, "donation", "image");

    return NextResponse.json({
      secure_url: uploadResult.url,
      public_id: uploadResult.publicId,
    });
  } catch (error) {
    console.error("Error uploading donation QR:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
