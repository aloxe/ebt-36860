import { NextResponse } from 'next/server'
const fs = require('fs');

export async function POST(request) {
  const { nextUrl: { search } } = request;
  const urlSearchParams = new URLSearchParams(search);
  const params = Object.fromEntries(urlSearchParams.entries());
  saveData(params)
  return NextResponse.json(params)
}

function saveData(newLocation) {
  let data = require('@/data/ebtlocation-test.json');
  data.lieux.push(newLocation)
  data.date = "last_updated=" + new Date().toISOString();
  fs.writeFileSync('/data/ebtlocation-test.json', JSON.stringify(data, null, 4));
}