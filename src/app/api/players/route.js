import prisma from "@/lib/prisma";
import { NextResponse } from 'next/server';

export async function GET() {
  const res = await prisma.visited.findMany();
  return NextResponse.json(res)
}

export async function POST(request) {
  const res = await request.json();

  if (!!res.dataToSave.id) {
    await saveUserData(res);
  } else if (!!res.dataToSave.communes) {
    await saveVisited(res);
  } else if (!res.dataToSave[0].type) {
    await savePolygons(res);
  } else {
    // TOD send correct error code
    console.log("ERROR can't save data");
  }
  return NextResponse.json(res);
}

async function saveUserData(res) {
  const date = new Date().toISOString()
  const userString = JSON.stringify(res.dataToSave)
  await prisma.visited.upsert({
    where: {
      user_id: `${res.userId}`,
    },
    update: {
      user: `${userString}`,
      date: date,
    },
    create: {
      user_id: `${res.userId}`,
      user: `${userString}`,
      content: `{}`,
      polygons: `{}`,
      date: date,
    },
  })
}

async function saveVisited(res) {
  const date = new Date().toISOString()
  const contentString = JSON.stringify(res.dataToSave)
  await prisma.visited.update({
  where: {
    user_id: `${res.userId}`,
  },
  data: {
    content: `${contentString}`,
    date: date,
  },
  })
}

// TODO remove polygon route folder
async function savePolygons(res) {
  const date = new Date().toISOString()
  const polygonString = JSON.stringify(res.dataToSave)
  await prisma.visited.update({
  where: {
    user_id: `${res.userId}`,
  },
  data: {
    polygons: `${polygonString}`,
    date: date,
  },
  })
}