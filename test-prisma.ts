import { prisma } from "./lib/prisma";

async function main() {
  console.log("Checking Prisma Client...");
  
  if (!prisma) {
    console.error("Prisma instance is undefined");
    return;
  }

  const modelNames = Object.keys(prisma).filter(k => !k.startsWith("_") && !k.startsWith("$"));
  console.log("Available models:", modelNames);

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
  }
}

main()
  .catch(e => console.error(e))
  .finally(async () => {
    await prisma.$disconnect();
  });
