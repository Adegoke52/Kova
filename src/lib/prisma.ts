import { PrismaClient } from "@prisma/client";

const globalForPrisma = global as unknown as { prisma: PrismaClient | undefined };

const getPrisma = () => {
  if (globalForPrisma.prisma) return globalForPrisma.prisma;
  
  // If we're building and don't have a DB URL, return a proxy or null to avoid crashing
  if (!process.env.DATABASE_URL && process.env.NODE_ENV === "production") {
    console.warn("No DATABASE_URL found during build. Database features will be unavailable.");
    return null as any;
  }

  const client = new PrismaClient({
    log: process.env.NODE_ENV === "development" ? ["query", "error", "warn"] : ["error"],
  });

  if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = client;
  return client;
};

export const prisma = getPrisma();
