import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { uploadFile } from "@/lib/supabase-storage";

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();

    const name = formData.get("name") as string;
    const fatherName = formData.get("fatherName") as string;
    const address1 = formData.get("address1") as string;
    const address2 = formData.get("address2") as string | null;
    const city = formData.get("city") as string;
    const state = formData.get("state") as string;
    const district = formData.get("district") as string;
    const pincode = formData.get("pincode") as string;
    const phone = formData.get("phone") as string;
    const dob = formData.get("dob") as string;
    const doj = formData.get("doj") as string;
    const proposedPost = formData.get("proposedPost") as string;
    const area = formData.get("area") as string | null;
    const recommendationId = formData.get("recommendationId") as string | null;
    const photoFile = formData.get("photo") as File | null;

    if (!name || !fatherName || !address1 || !city || !state || !district || !pincode || !phone || !dob || !doj || !proposedPost) {
      return NextResponse.json({ error: "Required fields missing." }, { status: 400 });
    }

    let photoUrl: string | null = null;

    if (photoFile && photoFile.size > 0) {
      const bytes = await photoFile.arrayBuffer();
      const buffer = Buffer.from(bytes);

      const path = `membership/${Date.now()}-${photoFile.name}`;
      const uploadResult = await uploadFile(buffer, path, photoFile.type);

      photoUrl = uploadResult.url;
    }

    const membership = await prisma.membership.create({
      data: {
        name, fatherName, address1, address2: address2 || null,
        city, state, district, pincode, phone, dob, doj,
        proposedPost, area: area || null,
        recommendationId: recommendationId || null,
        photoUrl,
      },
    });

    return NextResponse.json({ success: true, id: membership.id }, { status: 201 });
  } catch (error) {
    console.error("Membership submission error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
