'use client'
import Spinner from "@/components/common/spinner";
import dynamic from 'next/dynamic';
import { useCallback, useEffect, useState } from "react";
import { useTranslation } from '@/i18n/client'
import { useAuth } from "@/context/authcontext";
import { getCounts, savePolygons } from "@/helpers/dbutils";
import { getUserPolygones } from "@/helpers/maputils";

const DynamicMyMapComponent = dynamic(() =>
  import('@/components/maps/map').then((module) => module.MyMapComponent)
)

export function UserMapView({ lang, user }: DashboardProps) {
  /* eslint-disable react-hooks/rules-of-hooks */
  const { t } = useTranslation(lang, 'dashboard');
  const { visited } = useAuth();
  const [communes, setCommunes] = useState<any>(visited?.communes || undefined);
  const [departements, setDepartements] = useState<any>(visited?.departements || undefined);
  const [mapPolygons, setMapPolygons] = useState<any>(undefined);
  const [showDep, setShowDep] = useState<boolean>(false);
  const [showCom, setShowCom] = useState<boolean>(false);
  const [ fetching, setFetching ] = useState<boolean>(false);
  const [ disabled, setDisabled ] = useState<boolean>(true);

  const handlefetchData = useCallback( async () => {
    setFetching(true);

    const communesToDisplay = await getUserPolygones(communes, departements)
    console.log("returned");
    console.log(communesToDisplay);
    
    savePolygons(user.id, communesToDisplay); // TODO do we still save it?
    setMapPolygons(communesToDisplay)
    setDisabled(false);

}, [communes, departements])

  useEffect(() => {
    if (!fetching) {
      handlefetchData()
    }
  }, [fetching, handlefetchData])

  useEffect(() => {
    if (!communes) {
      const fetchCommunes = async () => {
        const resp = await getCounts(user.id, "communes,departements")
        setCommunes(resp.communes)
        setDepartements(resp.departements)
      }
      fetchCommunes()
    } else {
      setDisabled(true)
      setFetching(false)
    }
  }, [communes])

  return (
    <div className="bg-white rounded-lg border border-blue-200 text-left text-blue-900 p-2 m-2 sm:p-4 sm:m-4">
      <div className="flex justify-between">
        <h2>{t('your-map')}</h2>
      </div>
      <div className="md:flex md:justify-around">
        <div className="mb-[0.125rem] block min-h-[1.5rem] pl-[1.5rem]">
        <label
          className="inline-block pl-[0.15rem] hover:cursor-pointer"
          htmlFor='dep'>
          <input
          className="form-check-input h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
            id='dep' value='dep' type="checkbox" checked={showDep}
            onChange={() => setShowDep(!showDep)} /> {t('district', {count: 2})}
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
            htmlFor="com"> {t('municipality', {count: mapPolygons?.length})} {!disabled && mapPolygons && `(${mapPolygons.length})`}
          </label>
          {disabled && <Spinner />}
        </div>
      </div>
      <div className="w-full h-90 bg-orange-200 overflow-hidden">
        {mapPolygons && (
          <DynamicMyMapComponent departements={departements} dataCommunes={mapPolygons} showDep={showDep} showCom={showCom} />
        )}
      </div>
    </div>
    )
}
