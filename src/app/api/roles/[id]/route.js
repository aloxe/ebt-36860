import prisma from "@/lib/prisma";
import { NextResponse } from 'next/server';

export async function GET(req, { params }) {
  const res = await prisma.roles.findUnique({
    where: {
      id: params.id,
    },
    select: {
      admin: true,
      trans: true,
    },
  });
  return NextResponse.json(res)
}
