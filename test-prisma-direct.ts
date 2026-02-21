import { PrismaClient } from "./generated/prisma/client";

async function main() {
  console.log("Initializing Direct Prisma Client...");
  
  const prisma = new PrismaClient();

  console.log("Prisma Client Initialized.");

  // @ts-ignore
  if (prisma.announcement) {
    console.log("SUCCESS: prisma.announcement is defined");
    try {
      // @ts-ignore
      const count = await prisma.announcement.count();
      console.log("SUCCESS: Connection working. Announcement count:", count);
    } catch (e: any) {
      console.error("ERROR: Failed to query announcement table:", e.message);
    }
  } else {
    console.error("FAILURE: prisma.announcement is UNDEFINED");
    console.log("Available keys on prisma:", Object.keys(prisma).filter(k=>!k.startsWith("_")));
  }
  
  await prisma.$disconnect();
}

main().catch(console.error);
