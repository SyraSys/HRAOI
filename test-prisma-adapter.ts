import { PrismaClient } from "./generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";
import "dotenv/config";

async function main() {
  console.log("Initializing Prisma Client with Adapter...");
  console.log("DATABASE_URL:", process.env.DATABASE_URL ? "Defined" : "Undefined");

  const connectionString = process.env.DATABASE_URL;
  if (!connectionString) throw new Error("No DATABASE_URL");

  const pool = new Pool({ connectionString });
  const adapter = new PrismaPg(pool);
  
  // @ts-ignore
  const prisma = new PrismaClient({ adapter });

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
      console.error(e);
    }
  } else {
    console.error("FAILURE: prisma.announcement is UNDEFINED");
    const formattedKeys = Object.keys(prisma).filter(k=>!k.startsWith("_") && !k.startsWith("$"));
    console.log("Available keys on prisma:", formattedKeys);
  }
  
  await prisma.$disconnect();
}

main().catch(console.error);
