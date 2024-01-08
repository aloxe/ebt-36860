import prisma from "@/lib/prisma";
import { NextResponse } from 'next/server';

export async function GET(req, { params }) {
  const res = await prisma.polygons.findUnique({
    where: {
      user_id: params.id,
    },
    select: {
      date: true,
      polygons: true,
    },
  });
  return NextResponse.json(res)
}
