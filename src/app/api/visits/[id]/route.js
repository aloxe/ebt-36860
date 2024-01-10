import prisma from "@/lib/prisma";
import { NextResponse } from 'next/server';

export async function GET(req, { params }) {
  const res = await prisma.visits.findUnique({
    where: {
      user_id: params.id,
    },
    select: {
      user_id:true,
      date:true,
      cities:true,
      fr:true,
    },
  });
  return NextResponse.json(res)
}
