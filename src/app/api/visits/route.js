import prisma from "@/lib/prisma";
import { NextResponse } from 'next/server';

export async function POST(request) {
  const req = await request.json();
  saveData(req)
  return NextResponse.json({status: 200})
}

async function saveData(req) {
  const date = req.isNew ? new Date().toISOString() : undefined;
  console.log("save Data ", Object.keys(req.data)[0], req);
  if (Object.keys(req.data)[0] === "fr") { // TODO evolve for each [country]
    await prisma.visits.update({
      where: {
        user_id: `${req.userId}`,
      },
      data: {
        date: date,
        fr: `${JSON.stringify(req.data.fr)}`
      }
    });
  } else if (!req.isNew && Object.keys(req.data)[0] === "cities") { // upsert doesn't update when date is undefined
    await prisma.visits.update({
      where: {
        user_id: `${req.userId}`,
      },
      data: {
        date: date,
        cities: `${JSON.stringify(req.data.cities)}`,
      }
    });
  } else {
    await prisma.visits.upsert({
      where: {
        user_id: `${req.userId}`,
      },
      update: {
        date: date,
        cities: `${JSON.stringify(req.data.cities)}`,
      },
      create: {
        user_id: `${req.userId}`,
        date: date,
        cities: `${JSON.stringify(req.data.cities)}`,
        fr: `${req.data.fr ? JSON.stringify(req.data.fr) : ""}`,
      },
    })
  }
}