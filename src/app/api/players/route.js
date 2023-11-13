import prisma from "@/lib/prisma";
import { NextResponse } from 'next/server';

export async function GET() {
  const res = await prisma.visited.findMany();
  return NextResponse.json(res)
}

export async function POST(request) {
  const req = await request.json();
  if (!!req.dataToSave.id) {
    await saveUserData(req);
  } else if (!!req.dataToSave.communes) {
    await saveVisited(req);
  } else if (req.dataToSave[0].type === 'Feature') {
    await savePolygons(req);
  } else {
    // TODO send correct error code
    console.log("ERROR not good data: can't save");
  }
  return NextResponse.json(req);
}

async function saveUserData(req) {
  const date = new Date().toISOString()
  const userString = JSON.stringify(req.dataToSave)
  await prisma.visited.upsert({
    where: {
      user_id: `${req.userId}`,
    },
    update: {
      user: `${userString}`,
      date: date,
    },
    create: {
      user_id: `${req.userId}`,
      user: `${userString}`,
      content: `{}`,
      polygons: `{}`,
      date: date,
    },
  })
}

async function saveVisited(req) {
  const date = new Date().toISOString()
  const contentString = JSON.stringify(req.dataToSave)
  await prisma.visited.update({
  where: {
    user_id: `${req.userId}`,
  },
  data: {
    content: `${contentString}`,
    date: date,
  },
  })
}

async function savePolygons(req) {
  const date = new Date().toISOString()
  const polygonString = JSON.stringify(req.dataToSave)
  await prisma.visited.update({
  where: {
    user_id: `${req.userId}`,
  },
  data: {
    polygons: `${polygonString}`,
    date: date,
  },
  })
}