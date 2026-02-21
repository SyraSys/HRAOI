import { prisma } from "../lib/prisma";
import bcrypt from "bcryptjs";

async function main() {
  const email = process.env.ADMIN_EMAIL || "admin@hraoi.in";
  const password = process.env.ADMIN_PASSWORD || "Admin@HRAOI2024";

  const existing = await prisma.admin.findUnique({ where: { email } });
  if (existing) {
    console.log(`Admin already exists: ${email}`);
    return;
  }

  const hashed = await bcrypt.hash(password, 12);
  const admin = await prisma.admin.create({
    data: { email, password: hashed },
  });

  console.log(`✅ Admin created: ${admin.email}`);
  console.log(`   Password: ${password}`);
  console.log(`   ⚠️  Change this password after first login!`);
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
