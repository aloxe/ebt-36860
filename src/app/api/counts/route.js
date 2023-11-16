import prisma from "@/lib/prisma";
import { NextResponse } from 'next/server';

export async function POST(request) {
  const { nextUrl: { search } } = request;
  const urlSearchParams = new URLSearchParams(search);
  const params = Object.fromEntries(urlSearchParams.entries());
  saveData(params)
  return NextResponse.json(params)
}

async function saveData(req) {
  const date = new Date().toISOString()
    await prisma.counts.upsert({
      where: {
        user_id: `${req.userId}`,
      },
      update: {
        date: date,
        communes: `${req.data.communes || undefined}`,
        departements: `${req.data.departements || undefined}`,
        prefectures: `${req.data.prefectures || undefined}`,
        unknowns: `${req.data.unknowns || undefined}`,
      },
      create: {
        id: `${req.userId}`,
        date: date,
        communes: `${req.data.communes}`,
        departements: `${req.data.departements}`,
        prefectures: `${req.data.prefectures}`,
        unknowns: `${req.data.unknowns}`,
      },
    })
}