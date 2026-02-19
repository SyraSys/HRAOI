import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, subject, message } = body;

    if (!name || !email || !subject) {
      return NextResponse.json(
        { error: "Name, email, and subject are required." },
        { status: 400 }
      );
    }

    const enquiry = await prisma.enquiry.create({
      data: { name, email, subject, message: message || null },
    });

    return NextResponse.json({ success: true, id: enquiry.id }, { status: 201 });
  } catch (error) {
    console.error("Enquiry submission error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
