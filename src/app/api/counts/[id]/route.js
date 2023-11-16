import prisma from "@/lib/prisma";
import { NextResponse } from 'next/server';

export async function GET(req, { params }) {
  const res = await prisma.counts.findUnique({
    where: {
      id: params.id,
    },
  });
  return NextResponse.json(res)
}
