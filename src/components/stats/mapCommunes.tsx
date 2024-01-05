'use client'
import { MyMapComponent } from "../maps/map";
import { useTranslation } from '@/i18n/client'
import { makeUserPolygons } from "@/helpers/maputils";
import { useCallback, useEffect, useState } from "react";
import Spinner from "../common/spinner";
import NormalScreen from "@/assets/normal-screen.svg";
import FullScreen from "@/assets/full-screen.svg";
import { getPolygons, savePolygons } from "@/helpers/dbutils";

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

    let communesToDisplay = await getPolygons(user.id)
    if (!communesToDisplay) {
      communesToDisplay = await makeUserPolygons(communes, departements)
      setMapPolygons(communesToDisplay)
    } else {
      communesToDisplay = JSON.parse(communesToDisplay.polygons)
      savePolygons(user.id, communesToDisplay)
      setMapPolygons(communesToDisplay)
    }
    
}, [communes, departements])


  useEffect(() => {
    if (!fetching) {
      handlefetchData()
    }
  }, [fetching, handlefetchData])

  const defaultClass = "transition-{margin} duration-150 bg-white rounded-lg border border-blue-200 text-left text-black p-2 m-2 sm:p-4 sm:m-4"
  const fullScreenClass = "transition-{margin} duration-150 fixed top-0 bottom-0 left-0 right-0 bg-white text-left p-0 pt-[45px] m-0 h-[calc(100vh-45px)] w-[100vw] fullscreen"
  const defaultTitleClass = "transition-all duration-500 flex justify-between"
  const fullScreenTitleClass = "transition-all duration-500 flex justify-between absolute w-full px-14 pb-0 mt-4 text-xs z-[1000]"

  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    const isFull = event.currentTarget.children[0].className === "hidden";
  /* @ts-ignore */
  event.currentTarget.parentNode.parentNode.className = isFull ?
  defaultClass : fullScreenClass;
  /* @ts-ignore */
  event.currentTarget.parentNode.parentNode.className = isFull ?
  defaultClass : fullScreenClass;
  /* @ts-ignore */
  event.currentTarget.parentNode.className = isFull ?
  defaultTitleClass : fullScreenTitleClass;

  event.currentTarget.children[0].className = isFull ? "" : "hidden"
  event.currentTarget.children[1].className = isFull ? "hidden" : ""
  }
  return (
    <>
    <div className="bg-red-700 absolute z-50"></div>
      <div id="mapFrame" className="bg-white rounded-lg border border-blue-200 text-left text-black p-2 m-2 sm:p-4 sm:m-4">
        <div className="flex justify-between">
          <h2 className="drop-shadow-lg shadow-white">
            {t('usermap', {"username": username})}
          </h2>
          <div className="text-right text-stone-400 text-sm cursor-pointer"
            /* @ts-ignore */
            onClick={handleClick}
          >
            <div className=""><FullScreen height="30px" width="40px" fill="rgb(146 64 14)" isFull={false}/></div>
            <div className="hidden"><NormalScreen height="30px" width="40px" fill="rgb(146 64 14)"  /></div>
          {/* <Screen height="30px" width="40px" fill="rgb(146 64 14)" isFull={false}  */}
          </div> 
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