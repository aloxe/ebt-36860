'use client'
import Spinner from "@/components/common/spinner";
import { MyMapComponent } from "@/components/maps/map";
import { savePolygons } from "@/helpers/dbutils";
import { useAuth } from "@/hooks/authprovider";
import { useCallback, useEffect, useState } from "react";
// @ts-ignore
import { GeoJsonTypes } from 'react-leaflet';

type Feature = GeoJsonTypes.Feature

export function UserMap() {
  const { user, visited } = useAuth();
  const [showDep, setShowDep] = useState<boolean>(false);
  const [showCom, setShowCom] = useState<boolean>(false);
  const [ dataCommunes, setDataCommunes ] = useState<Feature[]>([]);
  const [ fetching, setFetching ] = useState<Boolean>(false);
  const [ disabled, setDisabled ] = useState<Boolean>(true);
const { communes } = visited;

  const regionsWithDomTom: region[] = require('@etalab/decoupage-administratif/data/regions.json')
  const regionCodes: string[] = regionsWithDomTom.map(item => item.code)

const fetchData = async (codeRegion:string) => {
  const response = await fetch(
      `https://geo.api.gouv.fr/communes?codeRegion=${codeRegion}&format=geojson&geometry=contour`
    )
  const results = await response.json()
  return results;
}

  const handlefetchData = useCallback( async () => {
    let communesToDisplay = new Array();
    let regionToDisplay = [];
    // console.log("handlefetchData" + new Date().toLocaleTimeString());
    setFetching(true);
    regionCodes.map( async (regionCode) => {
      // console.log(new Date().toLocaleTimeString());
      // TODO make this fetch quicker
      const regionCommunes = await fetchData(regionCode);
      const regionUserCommunes = await regionCommunes.features.filter((asset:Feature) => communes?.includes(asset.properties.code));
      // keeping nice example with Saints => asset.properties.code.includes("Saint"));
      communesToDisplay = communesToDisplay.concat(regionUserCommunes)
      regionToDisplay.push(regionCode)
      if (regionToDisplay.length == regionCodes.length) {
        // console.log("****** set communes data ******* " + new Date().toLocaleTimeString());
        setDataCommunes(communesToDisplay);
        setDisabled(false);
      }
    });
}, [communes, regionCodes])

  const handlesavePolygons = useCallback( async () => {
    const objectToSave = {
      userId: user.id,
      username: user.username,
      polygons: dataCommunes
    }
    savePolygons(objectToSave);
}, [user, dataCommunes])

  useEffect(() => {
    if (!fetching) {
      handlefetchData()
    }
  }, [fetching, handlefetchData])

  useEffect(() => {
    if (dataCommunes) {
      handlesavePolygons()
    }
  }, [dataCommunes, handlesavePolygons])

  return (
    <div className="bg-white rounded-lg border border-blue-200 text-left text-blue-900 p-4 m-5">
      <div className="flex justify-between">
        <h2>{user.username}&apos;s map</h2>
      </div>
      <div className="flex justify-around">
        <div className="mb-[0.125rem] block min-h-[1.5rem] pl-[1.5rem]">
        <label 
          className="inline-block pl-[0.15rem] hover:cursor-pointer"
          htmlFor='dep'>
          <input 
          className="form-check-input h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
            id='dep' value='dep' type="checkbox" checked={showDep} 
            onChange={() => setShowDep(!showDep)} /> départements
        </label>
        </div>

        <div className="mb-[0.125rem] block min-h-[1.5rem] pl-[1.5rem]">
          <input
            className="form-check-input h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
            type="checkbox" checked={showCom} value="com" id="com"
            onChange={() => setShowCom(!showCom)}
            // @ts-ignore
            disabled={disabled}
             />
          <label
            className={!disabled ? "inline-block pl-[0.15rem] hover:cursor-pointer mr-2" : "inline-block pl-[0.15rem] hover:cursor-pointer opacity-30  mr-2"}
            htmlFor="com"> communes ({dataCommunes.length})
          </label> 
          {disabled && <Spinner />}
        </div>
      </div>
      <div className="w-full h-90 bg-orange-200 overflow-hidden">
        {/* {typeof window !== 'undefined' && ( */}
          <MyMapComponent departements={visited?.departements} dataCommunes={dataCommunes} showDep={showDep} showCom={showCom} />
        {/* )} */}
      </div>
    </div>
    )
}
