import prisma from "@/lib/prisma";
import { NextResponse } from 'next/server';

export async function GET(req, { params }) {
  const fields = params.field.split(',');
  const res = await prisma.visits.findUnique({
    where: {
      user_id: params.id,
    },
    select: {
      user_id: fields.includes("user_id"),
      date: fields.includes("date"),
      cities: fields.includes("cities"),
      fr: fields.includes("fr"),
    },
  });
  return NextResponse.json(res)
}
