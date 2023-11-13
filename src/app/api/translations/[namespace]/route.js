import prisma from "@/lib/prisma";
import { NextResponse } from 'next/server';

export async function GET() {
  console.log("namespace");
  const res = await prisma.translations.findMany({
    where: {
      namespace: "faq"
    }
  });
  return NextResponse.json(res)
}
