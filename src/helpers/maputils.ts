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

  let promissed = regions.map(regCode => {
    return new Promise<Array<any[]>>( async (resolve, reject) => {
      const regCommunes = await fetchPolygonsPerRegion(regCode);
      const regVisitedCommunes = regCommunes.features.filter((asset: Feature) => communes?.includes(asset.properties.code));
      resolve(regVisitedCommunes)
    });
  });

  return Promise.all(promissed).then(values => {
    return Array().concat(...values)
  });
}
