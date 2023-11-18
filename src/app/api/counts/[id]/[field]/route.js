import prisma from "@/lib/prisma";
import { NextResponse } from 'next/server';

export async function GET(req, { params }) {
  const fields = params.field.split(',');
  const res = await prisma.counts.findUnique({
    where: {
      user_id: params.id,
    },
    select: {
      communes: fields.includes("communes"),
      departements: fields.includes("departements"),
      prefectures: fields.includes("prefectures"),
      unknowns: fields.includes("unknowns"),
      count: fields.includes("counts"),
    },
  });
  return NextResponse.json(res)
}
