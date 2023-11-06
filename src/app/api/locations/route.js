import prisma from "@/lib/prisma";
import { NextResponse } from 'next/server';

export async function GET() {
  const res = await prisma.lieux.findMany();
  return NextResponse.json(res)
}

export async function POST(request) {
  const { nextUrl: { search } } = request;
  const urlSearchParams = new URLSearchParams(search);
  const params = Object.fromEntries(urlSearchParams.entries());
  saveData(params)
  return NextResponse.json(params)
}

async function saveData(newLocation) {
    const newEntry = await prisma.lieux.create({
        data: newLocation,
        select: {
           id: true
        }
    });
  return newEntry;
}