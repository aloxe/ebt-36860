import prisma from "@/lib/prisma";
import { NextResponse } from 'next/server';

export async function GET() {
  const res = await prisma.translations.findMany();
  return NextResponse.json(res)
}

export async function POST(request) {
  const req = await request.json();
  saveData(req)
  return NextResponse.json({status: 200})
}

async function saveData(req) {
  await prisma.translations.upsert({
    where: {
      id: `${req.ns}/${req.key}`,
    },
    update: {
     [req.lang]: `${req.string}`,
    },
    create: {
      id: `${req.ns}/${req.key}`,
      namespace: `${req.ns}`,
      key: `${req.key}`,
      [req.lang]: `${req.string}`,
    },
  })
}