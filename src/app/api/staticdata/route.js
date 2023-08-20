import { NextResponse } from 'next/server'
import EBTLocations from "../../_data/ebtlocation.json"
const fs = require('fs');

export async function POST(request) {
  // const location = request.nextUrl.searchParams
  const { nextUrl: { search } } = request;
  const urlSearchParams = new URLSearchParams(search);
  const params = Object.fromEntries(urlSearchParams.entries());
  saveData(params)
  return NextResponse.json(params)
}

function saveData(newLocation) {
  let data = require('../../_data/ebtlocation.json');
  data.lieux.push(newLocation)
  data.date = "last_updated=" + new Date().toISOString();
  fs.writeFileSync('src/app/_data/ebtlocation.json', JSON.stringify(data, null, 4));
  // console.log(data);
}