import prisma from "@/lib/prisma";
import { NextResponse } from 'next/server';


export async function POST(request) {
  const req = await request.json();
  const res = await prisma.visited.findUnique({
    where: {
      user_id: req.toString(),
    },
  });
  return NextResponse.json(res);
}