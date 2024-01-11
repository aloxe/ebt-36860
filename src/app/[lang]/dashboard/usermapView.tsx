'use client'
import dynamic from 'next/dynamic';
import Spinner from "@/components/common/spinner";
import { useCallback, useEffect, useState } from "react";
import { useTranslation } from '@/i18n/client'
import { useAuth } from "@/context/authcontext";
import { fetchPolygons } from "@/helpers/maputils";
import { FullScreenButton } from "@/components/stats/fullScreenButton";

// necessary to avoid server rendering of this part
const DynamicMyMapComponent = dynamic(() =>
  import('@/components/maps/map').then((module) => module.MyMapComponent))

export function UserMapView({ lang, user }: DashboardProps) {
  /* eslint-disable react-hooks/rules-of-hooks */
  const { t } = useTranslation(lang, 'dashboard');
  const { visited, polygons, setPolygons } = useAuth();
  const [communes, setCommunes] = useState<any>(visited?.communes || undefined);
  const [departements, setDepartements] = useState<any>(visited?.departements || undefined);
  const [mapPolygons, setMapPolygons] = useState<any>(undefined);
  const [showDep, setShowDep] = useState<boolean>(false);
  const [showCom, setShowCom] = useState<boolean>(false);
  const [ disabled, setDisabled ] = useState<boolean>(true);
  const [ fullscreen, setFullscreen ] = useState<boolean>(false);

  const handlefetchData = useCallback( async () => {
    const communesToDisplay = await fetchPolygons(user.id, communes, departements, true)
    setMapPolygons(communesToDisplay)
    setPolygons(communesToDisplay)
    setDisabled(false);
}, [communes, departements, user, setPolygons])

  useEffect(() => {
    if (!polygons) {
      handlefetchData()
    } else {
      setMapPolygons(polygons)
      setDisabled(false);
      setShowDep(true);
      setShowCom(true);
    }
  }, [polygons, handlefetchData])

  const allowScrollZoom = () => {
    setFullscreen(!fullscreen)
  }

  return (
    <div className="bg-white rounded-lg border border-blue-200 text-left text-blue-900 p-2 m-2 sm:p-4 sm:m-4">
      <div className="flex justify-between">
        <h2>{t('your-map')}</h2>
        <FullScreenButton allowScrollZoom={allowScrollZoom} />
      </div>
      <div className="md:flex md:justify-around text-center bg-white
      group-[.fullscreen]:text-xs group-[.fullscreen]:absolute group-[.fullscreen]:top-[96px] group-[.fullscreen]:left-[58px] group-[.fullscreen]:z-[550] group-[.fullscreen]:text-left
      
      ">
        <div className="my-[0.125rem] inline-block min-h-[1.5rem] pl-[1.5rem]
        group-[.fullscreen]:block group-[.fullscreen]:pl-[0.125rem]
        ">
        <label 
          className="inline-block pl-[0.15rem] hover:cursor-pointer"
          htmlFor='dep'>
          <input 
          className="form-check-input h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
            id='dep' value='dep' type="checkbox" checked={showDep} 
            onChange={() => setShowDep(!showDep)} /> {t('district', {count: 2})}
        </label>
        </div>

        <div className="my-[0.125rem] inline-block min-h-[1.5rem] pl-[1.5rem]
        group-[.fullscreen]:block group-[.fullscreen]:pl-[0.125rem]">
          
          <label
            className={!disabled ? "inline-block pl-[0.15rem] hover:cursor-pointer mr-2" : "inline-block pl-[0.15rem] hover:cursor-pointer opacity-30  mr-2"}
            htmlFor="com">
              <input
            className="form-check-input h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
            type="checkbox" checked={showCom} value="com" id="com"
            onChange={() => setShowCom(!showCom)}
            // @ts-ignore
            disabled={disabled}
             /> {t('municipality', {count: mapPolygons?.length})} {!disabled && mapPolygons && `(${mapPolygons.length})`}
          </label> 
          {disabled && <Spinner />}
        </div>
      </div>
      <div className="w-full h-90 overflow-hidden text-center">
        {mapPolygons && (
          <DynamicMyMapComponent departements={departements} dataCommunes={mapPolygons} showDep={showDep} showCom={showCom} allowScrollZoom={fullscreen} />
        )}
      </div>
    </div>
    )
}
