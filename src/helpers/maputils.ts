// @ts-ignore
import { GeoJsonTypes } from 'react-leaflet';
import { getRegions } from './cityutils';
type Feature = GeoJsonTypes.Feature

const fetchPolygonsPerRegion = async (codeRegion:string) => {
  const response = await fetch(
      `https://geo.api.gouv.fr/communes?codeRegion=${codeRegion}&format=geojson&geometry=contour`
    )
  const results = await response.json()
  return results;
}

// unused but useful to keep this url here
const fetchPolygonsPerDpt = async (dptCode:string) => {
  const response = await fetch(
      `https://geo.api.gouv.fr/departements/${dptCode}/communes?format=geojson&geometry=contour`
    )
  const results = await response.json()
  return results;
}

export const getUserPolygones = async (communes: string[], departements: string[]) => {
  var regions = getRegions(departements)
  let communesToDisplay = new Array();
  let regToDisplay = [];

  regions.map( async (regCode) => {
    console.log(regCode);
    
    const regCommunes = await fetchPolygonsPerRegion(regCode);
    const regVisitedCommunes = regCommunes.features.filter((asset: Feature) => communes?.includes(asset.properties.code));
    communesToDisplay = communesToDisplay.concat(regVisitedCommunes)
    regToDisplay.push(regCode)
    console.log(regToDisplay.length + " <=≤ ≥ >= " + regions.length);
    console.log(regVisitedCommunes);
    
    if (regToDisplay.length == regions.length) {
      console.log("return");
      
      return communesToDisplay;
    }
   })
}
