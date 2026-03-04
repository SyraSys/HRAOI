import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req: NextRequest) {
  try {
    const searchParams = req.nextUrl.searchParams;
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { error: "Search ID is required" },
        { status: 400 }
      );
    }

    // Search exclusively in Certificate table by certificateNumber
    const certificates = await prisma.certificate.findMany({
      where: {
        certificateNumber: {
          contains: id,
          mode: "insensitive",
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    if (certificates.length === 0) {
      return NextResponse.json(
        { error: "No member found with this ID" },
        { status: 404 }
      );
    }

    return NextResponse.json({
        success: true,
        data: certificates
    });
  } catch (error) {
    console.error("Certificate search error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
