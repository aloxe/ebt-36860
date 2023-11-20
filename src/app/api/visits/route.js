import prisma from "@/lib/prisma";
import { NextResponse } from 'next/server';

export async function POST(request) {
  const req = await request.json();
  saveData(req)
  return NextResponse.json({status: 200})
}

async function saveData(req) {
  const date = req.isNew ? new Date().toISOString() : undefined;
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