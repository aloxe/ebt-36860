import prisma from "@/lib/prisma";
import { NextResponse } from 'next/server';

export async function GET(req, { params }) {
  const fields = params.field.split(',');
  const res = await prisma.counts.findUnique({
    where: {
      user_id: params.id,
    },
    select: {
      user_id: fields.includes("user_id"),
      date: fields.includes("date"),
      communes: fields.includes("communes"),
      departements: fields.includes("departements"),
      prefectures: fields.includes("prefectures"),
      unknowns: fields.includes("unknowns"),
      count: fields.includes("count"),
    },
  });
  return NextResponse.json(res)
}
