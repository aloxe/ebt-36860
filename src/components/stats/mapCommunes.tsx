'use client'
import { getUserPolygons } from "@/helpers/dbutils";
import { MyMapComponent } from "../maps/map";
import { useTranslation } from '@/i18n/client'
import { getUserPolygones } from "@/helpers/maputils";
import { useCallback, useEffect, useState } from "react";
import Spinner from "../common/spinner";

interface MapCommunesProps {
  lang: string
  user: User
  communes: string[]
  departements: string[]
}

function MapCommunes({lang, user, communes, departements}: MapCommunesProps) {
  /* eslint-disable react-hooks/rules-of-hooks */
  const { t } = useTranslation(lang, 'stats')
  const { username } = user;
  const [mapPolygons, setMapPolygons] = useState<any>(undefined);
  const [ fetching, setFetching ] = useState<boolean>(false);
  
  // NOTE: This is a use-client component because 
  // sever can't handle polygone data for even 1 departement
  const handlefetchData = useCallback( async () => {
    setFetching(true);
    const communesToDisplay = await getUserPolygones(communes, departements)
    setMapPolygons(communesToDisplay)
}, [communes, departements])


  useEffect(() => {
    if (!fetching) {
      handlefetchData()
    }
  }, [fetching, handlefetchData])

  return (
    <>
      <div className="bg-white rounded-lg border border-blue-200 text-left text-black p-2 m-2 sm:p-4 sm:m-4">
        <div className="">
          <h2>
            {t('usermap', {"username": username})}
          </h2>
        </div>
        <div className="text-left text-lg font-bold mb-4">
          <div className="w-full h-90 overflow-hidden text-center">
            {!mapPolygons && <Spinner />}
            {!!mapPolygons && <MyMapComponent departements={departements} dataCommunes={mapPolygons} showDep={true} showCom={true} tiles={"carto"} />}
          </div>
        </div>
      </div>
    </>
  )
}

export default MapCommunes;