import prisma from "@/lib/prisma";
import { NextResponse } from 'next/server';

export async function GET(req, { params }) {
  const res = await prisma.users.findUnique({
    where: {
      id: params.id,
    },
    select: {
      id: true,
      date: true,
      username: true, 
      sessionid: true,
      my_city: true,
      my_zip: true,
      my_country: true,
      my_flag: true,
      totalbills: true,
      totalhits: true,
      email: true
    },
  });
  return NextResponse.json(res)
}
