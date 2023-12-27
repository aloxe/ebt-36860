import prisma from "@/lib/prisma";
import { NextResponse } from 'next/server';

export async function POST(request) {
  const req = await request.json();
  if (!!req.dataToSave) {
    await saveUserData(req);
  } else {
    // TODO send correct error code
    console.log("ERROR not good data: can't save", req);
  }
  return NextResponse.json(req);
}

async function saveUserData(req) {
  console.log(saveUserData, req);
  const date = new Date().toISOString()
  const data = JSON.stringify(req)
  await prisma.users.upsert({
    where: {
      user_id: `${data.user_id}`,
    },
    update: {
      username: `${data.username}`,
      sessionid: `${data.sessionid}`,
      my_city: `${data.my_city}`,
      my_country: `${data.my_country}`,
      my_flag: `${data.my_flag}`,
      my_zip: `${data.my_zip}`,
      totalbills: `${data.totalbills}`,
      totalhits: `${data.totalhits}`,
      email: `${data.email}`,
    },
    create: {
      user_id: `${data.user_id}`,
      username: `${data.username}`,
      date: date,
      sessionid: `${data.sessionid}`,
      my_city: `${data.my_city}`,
      my_country: `${data.my_country}`,
      my_flag: `${data.my_flag}`,
      my_zip: `${data.my_zip}`,
      totalbills: `${data.totalbills}`,
      totalhits: `${data.totalhits}`,
      email: `${data.email}`,
    },
  })
}
