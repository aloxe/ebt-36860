import prisma from "@/lib/prisma";
import { NextResponse } from 'next/server';

export async function POST(request) {
  const res = await request.json();
  await saveData(res);
  return NextResponse.json(res);
}

async function saveData(objectToSave) {
  const date = new Date().toISOString()
  const polygonString = JSON.stringify(objectToSave.polygons)
  await prisma.visited.upsert({
    where: {
      user_id: `${objectToSave.userId}`,
    },
    update: {
      polygons: `${polygonString}`,
      date: date,
    },
    create: {
      user_id: `${objectToSave.userId}`,
      username: `${objectToSave.username}`,
      content: "{}",
      polygons: `${polygonString}`,
      date: date,
    },
  })
}
