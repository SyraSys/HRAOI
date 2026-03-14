import { defineConfig, env } from "prisma/config";
import { loadEnvConfig } from "@next/env";

const projectDir = process.cwd();
loadEnvConfig(projectDir);

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    seed: 'tsx prisma/seed.ts',
    path: "prisma/migrations",
  },
  datasource: {
    url: env("DATABASE_URL"),
  },
});
