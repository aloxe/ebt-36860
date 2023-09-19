import { NextResponse } from 'next/server'
const fs = require('fs');

// export default async function handler(req, res) {
//   try {
//     const result = await req.json();
//     res.status(200).send({ result })
//   } catch (err) {
//     res.status(500).send({ error: 'failed to fetch data' })
//   }
// }

export async function POST(request) {
  const res = await request.json();
  saveData(res);
  return NextResponse.json(res);
}

function saveData(visited) {
  fs.writeFileSync(`src/data/players/${visited.userId}-visited.json`, JSON.stringify(visited, null, 4));
}