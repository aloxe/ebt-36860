import prisma from "@/lib/prisma";
import { NextResponse } from 'next/server';

export async function GET(req, { params }) {
  const res = await prisma.translations.findMany({
    where: {
      namespace: {
        equals: params.ns
      },
    },
    select: {
      key: true,
      [params.lang]: true,
    },
  });
  let response = new Object;
  res.map(item => response[item.key] = item[params.lang])
  return NextResponse.json(response)
}
