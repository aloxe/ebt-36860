import prisma from "@/lib/prisma";
import { NextResponse } from 'next/server';

export async function POST(request) {
  const req = await request.json();
  if (!!req.id) {
    await saveUserData(req);
  } else {
    console.log("ERROR not good user data: must have an id", req);
  }
  return NextResponse.json(req);
}

async function saveUserData(req) {
  const date = new Date().toISOString()
  const data = req.dataToSave;
  await prisma.users.upsert({
    where: {
      id: req.id,
    },
    update: {
      username: req.username,
      sessionid: req.sessionid,
      my_city: req.my_city,
      my_country: req.my_country,
      my_flag: req.my_flag,
      my_zip: req.my_zip,
      totalbills: req.totalbills,
      totalhits: req.totalhits,
      email: req.email,
    },
    create: {
      id: req.id,
      username: req.username,
      date: date,
      sessionid: req.sessionid,
      my_city: req.my_city,
      my_country: req.my_country,
      my_flag: req.my_flag,
      my_zip: req.my_zip,
      totalbills: req.totalbills,
      totalhits: req.totalhits,
      email: req.email,
    },
  })
}
