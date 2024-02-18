// @ts-ignore
import { GeoJsonTypes } from 'react-leaflet';
import { getRegions } from './cityutils';
import { MAX_POLYGONS, getPolygons, savePolygons } from './dbutils';
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

export const makeUserPolygons = async (communes: string[], departements: string[]) => {
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

export const fetchPolygons = async (userId: string, communes: string[], departements: string[]) => {
  const canSave = communes.length <= MAX_POLYGONS
  let communesToDisplay = canSave ? await getPolygons(userId) : null;
  if (communesToDisplay) {
    communesToDisplay = JSON.parse(communesToDisplay.polygons)
    if (communesToDisplay.length === communes.length) {
      // return saved polygons only if not new
      return communesToDisplay
    }
  }
  communesToDisplay = await makeUserPolygons(communes, departements)
  canSave && savePolygons(userId, communesToDisplay)
  return communesToDisplay
}
