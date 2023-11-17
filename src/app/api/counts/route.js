import prisma from "@/lib/prisma";
import { NextResponse } from 'next/server';

export async function GET(req, { params }) {
  const res = await prisma.counts.findUnique({
    where: {
      id: params.id,
    },
    select: {
      count: true,
    },
  });
  return NextResponse.json(res)
}

export async function POST(request) {
  const req = await request.json();
  saveData(req)
  return NextResponse.json({status: 200})
}

async function saveData(req) {
  const date = new Date().toISOString()
  await prisma.counts.upsert({
    where: {
      user_id: `${req.userId}`,
    },
    update: {
      date: date,
      communes: `${req.data.communes ? JSON.stringify(req.data.communes) : undefined}`,
      departements: `${req.data.departements ? JSON.stringify(req.data.departements) : undefined}`,
      prefectures: `${req.data.prefectures ? JSON.stringify(req.data.prefectures) : undefined}`,
      unknowns: `${req.data.unknowns ? JSON.stringify(req.data.unknowns) : undefined}`,
    },
    create: {
      user_id: `${req.userId}`,
      date: date,
      communes: `${JSON.stringify(req.data.communes)}`,
      departements: `${JSON.stringify(req.data.departements)}`,
      prefectures: `${JSON.stringify(req.data.prefectures)}`,
      unknowns: `${JSON.stringify(req.data.unknowns)}`,
    },
  })
}