import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";

export async function GET() {
  try {
    const details = await prisma.donationDetails.findFirst();
    return NextResponse.json(details || {});
  } catch (error) {
    console.error("Error fetching donation details:", error);
    return NextResponse.json(
      { error: "Failed to fetch donation details" },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const session = await auth();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const {
      upiId,
      qrCodeUrl,
      qrCodePublicId,
      accountName,
      accountNumber,
      bankName,
      ifscCode,
    } = body;

    if (!upiId || !qrCodeUrl || !accountName || !accountNumber || !bankName || !ifscCode) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const existingDetails = await prisma.donationDetails.findFirst();

    if (existingDetails) {
      const updated = await prisma.donationDetails.update({
        where: { id: existingDetails.id },
        data: {
          upiId,
          qrCodeUrl,
          qrCodePublicId,
          accountName,
          accountNumber,
          bankName,
          ifscCode,
        },
      });
      return NextResponse.json(updated);
    } else {
      const created = await prisma.donationDetails.create({
        data: {
          upiId,
          qrCodeUrl,
          qrCodePublicId,
          accountName,
          accountNumber,
          bankName,
          ifscCode,
        },
      });
      return NextResponse.json(created);
    }
  } catch (error) {
    console.error("Error updating donation details:", error);
    return NextResponse.json(
      { error: "Failed to update donation details" },
      { status: 500 }
    );
  }
}
