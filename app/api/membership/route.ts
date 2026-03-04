import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { uploadFile } from "@/lib/cloudinary";

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    console.log("Membership FormData keys:", Array.from(formData.keys()));

    const name = formData.get("name") as string;
    const fatherName = formData.get("fatherName") as string;
    const parentsAddress = formData.get("parentsAddress") as string;
    const permanentAddress = formData.get("permanentAddress") as string;
    const aadharNumber = formData.get("aadharNumber") as string;
    const vehicleNumber = formData.get("vehicleNumber") as string | null;
    const educationQualification = formData.get("educationQualification") as string;
    const dob = formData.get("dob") as string;
    const bloodGroup = formData.get("bloodGroup") as string;
    const phone = formData.get("phone") as string;
    const profession = formData.get("profession") as string;
    const familyDetails = formData.get("familyDetails") as string;
    const introducedBy = formData.get("introducedBy") as string | null;
    const photoFile = formData.get("photo") as File | null;

    if (!name || !fatherName || !parentsAddress || !permanentAddress || !aadharNumber || !educationQualification || !dob || !bloodGroup || !phone || !profession || !familyDetails) {
      return NextResponse.json({ error: "Required fields missing." }, { status: 400 });
    }

    let photoUrl: string | null = null;

    if (photoFile && photoFile.size > 0) {
      const bytes = await photoFile.arrayBuffer();
      const buffer = Buffer.from(bytes);

      const uploadResult = await uploadFile(buffer, "membership", "image");

      photoUrl = uploadResult.url;
    }

    const membership = await prisma.membership.create({
      data: {
        name,
        fatherName,
        parentsAddress,
        permanentAddress,
        aadharNumber,
        vehicleNumber: vehicleNumber || null,
        educationQualification,
        dob,
        bloodGroup,
        phone,
        profession,
        familyDetails,
        introducedBy: introducedBy || null,
        photoUrl,
      },
    });

    return NextResponse.json({ success: true, id: membership.id }, { status: 201 });
  } catch (error) {
    console.error("Membership submission error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
