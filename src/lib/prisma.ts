// lib/prisma.ts
import { PrismaClient } from '@prisma/client';

let prisma: PrismaClient;
prisma = new PrismaClient({
  log: ['warn', 'error'],
});

if (process.env.NODE_ENV === 'production') {
  prisma = new PrismaClient();
} else {
  // @ts-ignore
  if (!global.prisma) {
    // @ts-ignore
    global.prisma = new PrismaClient();
  }
  // @ts-ignore
  prisma = global.prisma;
}

export default prisma;
