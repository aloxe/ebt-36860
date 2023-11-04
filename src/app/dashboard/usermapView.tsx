'use client'
import Spinner from "@/components/common/spinner";
import { useAuth } from "@/context/authcontext";
import dynamic from 'next/dynamic';
import { useCallback, useEffect, useState } from "react";
// @ts-ignore
import { GeoJsonTypes } from 'react-leaflet';

const DynamicMyMapComponent = dynamic(() =>
  import('@/components/maps/map').then((module) => module.MyMapComponent)
)
type Feature = GeoJsonTypes.Feature

type UserMapViewProps = {
  visited: Visited, 
  user: User, 
  savePolygons: any
}

export function UserMapView({ visited, user, savePolygons }: UserMapViewProps) {
  const [mapPolygons, setMapPolygons] = useState<any>(undefined);
  const [showDep, setShowDep] = useState<boolean>(false);
  const [showCom, setShowCom] = useState<boolean>(false);
  const [ fetching, setFetching ] = useState<boolean>(false);
  const [ disabled, setDisabled ] = useState<boolean>(true);
  const { communes } = visited;

  const regionsWithDomTom: Region[] = require('@etalab/decoupage-administratif/data/regions.json')
  const regionCodes: string[] = regionsWithDomTom.map(item => item.code)

const fetchPolygonsPerRegion = async (codeRegion:string) => {
  const response = await fetch(
      `https://geo.api.gouv.fr/communes?codeRegion=${codeRegion}&format=geojson&geometry=contour`
    )
  const results = await response.json()
  return results;
}

  const handlefetchData = useCallback( async () => {
    let communesToDisplay = new Array();
    let regionToDisplay = [];

    setFetching(true);
    regionCodes.map( async (regionCode) => {
      // TODO try to make this fetch quicker
      const regionCommunes = await fetchPolygonsPerRegion(regionCode);
      const regionVisitedCommunes = await regionCommunes.features.filter((asset:Feature) => communes?.includes(asset.properties.code));
      communesToDisplay = communesToDisplay.concat(regionVisitedCommunes)
      regionToDisplay.push(regionCode)
      if (regionToDisplay.length == regionCodes.length) {
        // save polygones of the user
        savePolygons(communesToDisplay);
        setMapPolygons(communesToDisplay)
        setDisabled(false);
      }
    });
}, [communes, regionCodes, savePolygons])

  useEffect(() => {
    if (!fetching) {
      handlefetchData()
    }
  }, [fetching, handlefetchData])

    useEffect(() => {
    if (visited) {
      setDisabled(true)
      setFetching(false)
    }
  }, [visited])

  return (
    <div className="bg-white rounded-lg border border-blue-200 text-left text-blue-900 p-2 m-2 sm:p-4 sm:m-4">
      <div className="flex justify-between">
        <h2><>{user?.username ?? user}</>&apos;s map</h2>
      </div>
      <div className="md:flex md:justify-around">
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
            htmlFor="com"> communes {!disabled && mapPolygons && `(${mapPolygons.length})`}
          </label> 
          {disabled && <Spinner />}
        </div>
      </div>
      <div className="w-full h-90 bg-orange-200 overflow-hidden">
        {mapPolygons && (
          <DynamicMyMapComponent departements={visited?.departements} dataCommunes={mapPolygons} showDep={showDep} showCom={showCom} />
        )}
      </div>
    </div>
    )
}
