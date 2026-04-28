import { PrismaClient } from "@prisma/client";
import path from "node:path";

const globalForPrisma = globalThis;
const sqliteUrl = `file:${path.resolve(process.cwd(), "prisma", "dev.db").replace(/\\/g, "/")}`;

export const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({
    datasources: {
      db: {
        url: sqliteUrl
      }
    },
    log: process.env.NODE_ENV === "development" ? ["query", "warn", "error"] : ["error"]
  });

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}
