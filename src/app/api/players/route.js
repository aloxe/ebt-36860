import prisma from "@/lib/prisma";
import { NextResponse } from 'next/server';

export async function GET() {
  const res = await prisma.visited.findMany();
  return NextResponse.json(res)
}



export async function POST(request) {
  const res = await request.json();
  await saveData(res);
  return NextResponse.json(res);
}

async function saveData(objectToSave) {
  const date = new Date().toISOString()
  const userString = JSON.stringify(objectToSave.user)
  const contentString = JSON.stringify(objectToSave.visited)
  const polygonString = JSON.stringify(objectToSave.polygon)
  await prisma.visited.upsert({
    where: {
      user_id: `${objectToSave.userId}`,
    },
    update: {
      user: `${userString}`,
      content: `${contentString}`,
      polygons: `${polygonString}`,
      date: date,
    },
    create: {
      user_id: `${objectToSave.userId}`,
      user: `${userString}`,
      content: `${contentString}`,
      polygons: `${polygonString}`,
      date: date,
    },
  })
}
