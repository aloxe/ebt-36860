// @ts-ignore
import { GeoJsonTypes } from 'react-leaflet';
type Feature = GeoJsonTypes.Feature

const fetchPolygonsPerRegion = async (codeRegion:string) => {
  const response = await fetch(
      `https://geo.api.gouv.fr/communes?codeRegion=${codeRegion}&format=geojson&geometry=contour`
    )
  const results = await response.json()
  return results;
}

const fetchPolygonsPerDpt = async (dptCode:string) => {
  const response = await fetch(
      `https://geo.api.gouv.fr/departements/${dptCode}/communes?format=geojson&geometry=contour`
    )
  const results = await response.json()
  return results;
}

export const getUserPolygones = async (communes: string[], departements: string[]) => {
console.log("getUserPolygones");

  const deptsWithDomTom: any[] = require('@etalab/decoupage-administratif/data/departements.json')
  deptsWithDomTom.filter(item => departements.includes(item.code))
  console.log(deptsWithDomTom);
  
  const regionsdpt = deptsWithDomTom.map(item => item.codeRegion)
console.log(regionsdpt);

  var regions = regionsdpt.filter((reg, index, self) =>
    index === self.findIndex((r) => (r === reg))
  );

  console.log(regions);
  
  const regionsWithDomTom: Region[] = require('@etalab/decoupage-administratif/data/regions.json')
  const regionCodes: string[] = regionsWithDomTom.map(item => item.code)
  let communesToDisplay = new Array();
  let regToDisplay = [];

  
  // const dptVisitedCommunes = await dptCommunes.features.filter((asset: Feature) => communes?.includes(asset.properties.code));
  // communesToDisplay = communesToDisplay.concat(dptVisitedCommunes)
  // console.log("=======================");
  // console.log(dptVisitedCommunes);
  // console.log("=======================");

  // return communesToDisplay

  // setFetching(true);
  regionCodes.map( async (regCode) => {
    // TODO try to make this fetch quicker
    const regCommunes = await fetchPolygonsPerRegion(regCode);
    // const regCommunes = require(`@/data/regions/communes${regCode}.json`);
    const regVisitedCommunes = regCommunes.features.filter((asset: Feature) => communes?.includes(asset.properties.code));
    communesToDisplay = communesToDisplay.concat(regVisitedCommunes)
    regToDisplay.push(regCode);
  })
  return communesToDisplay
}
