import prisma from "@/lib/prisma";
import { NextResponse } from 'next/server';

export async function POST(request) {
  const res = await request.json();
  await saveData(res);
  return NextResponse.json(res);
}

// async function saveData(res) {
//   const date = new Date().toISOString()
//   await prisma.visited.create({
//     data: {
//       user_id: "id",
//       username: "name",
//       content: "content",
//       date: date,
//     },
//   })
//   console.log("data saved 👍");
// }


async function saveData(visited) {
  const date = new Date().toISOString()
  const userContent = JSON.stringify(visited)
  await prisma.visited.upsert({
    where: {
      user_id: `${visited.userId}`,
    },
    update: {
      content: `${userContent}`,
      date: date,
    },
    create: {
      user_id: `${visited.userId}`,
      username: `${visited.username}`,
      content: `${userContent}`,
      date: date,
    },
  })
  console.log("data saved 👍");
}