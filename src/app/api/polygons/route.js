import prisma from "@/lib/prisma";
import { NextResponse } from 'next/server';

export async function POST(request) {
  const req = await request.json();
  saveData(req)
  return NextResponse.json({status: 200})
}

async function saveData(req) {
  const date = new Date().toISOString()
  const poly = JSON.stringify(req.data);
  await prisma.polygons.upsert({
    where: {
      user_id: `${req.userId}`,
    },
    update: {
     date: date,
     polygons: poly,
    },
    create: {
      user_id: `${req.userId}`,
      date: date,
      polygons: poly,
    },
  })
}