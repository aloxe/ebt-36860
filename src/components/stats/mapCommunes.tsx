'use client'
import { MyMapComponent } from "../maps/map";
import { useTranslation } from '@/i18n/client'
import { makeUserPolygons } from "@/helpers/maputils";
import { useCallback, useEffect, useState } from "react";
import Spinner from "../common/spinner";
import NormalScreen from "@/assets/normal-screen.svg";
import FullScreen from "@/assets/full-screen.svg";
import { getPolygons, savePolygons } from "@/helpers/dbutils";
import union from '@turf/union';

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
    console.log("find polygons");
    var startTime1 = performance.now()

    let communesToDisplay = await getPolygons(user.id)
    var endTime1 = performance.now()
    console.log(`Call to getPolygons took ${endTime1 - startTime1} ms`)
    if (!communesToDisplay) {
      console.log("not in DB > make");
      var startTime2 = performance.now()
      communesToDisplay = await makeUserPolygons(communes, departements)
      var endTime2 = performance.now()
      console.log(`Call to makeUserPolygons took ${endTime2 - startTime2} ms`)
      savePolygons(user.id, communesToDisplay)
      setMapPolygons(communesToDisplay)
    } else {
      console.log("in DB > no need for make");
      communesToDisplay = JSON.parse(communesToDisplay.polygons)
      setMapPolygons(communesToDisplay)
    }
    var endTime3 = performance.now()
    console.log(`All took ${endTime3 - startTime1} ms TOTAL`)
    console.log(communesToDisplay);
    console.log(JSON.stringify(communesToDisplay).length);
    
  if (communesToDisplay.length > 500) {
    savePolygons(user.id, communesToDisplay)
  }
//   console.log("on coupe en mmorceaux");


//   let chunk = []
//   for (let i = 0; i < communesToDisplay.length; i += 500) {
//     chunk.push(communesToDisplay.slice(i, i + 500));
//   }
//     // savePolygons(user.id, "split="+chunk.length)
//     for (let i = 0; i < chunk.length; i++) {
//     console.log('save chunk[i] ' + i, chunk[i]);
//     savePolygons(user.id+"-"+i.toString(), chunk[i])
//   }
// }

    // var fusionCommunes = communesToDisplay[0];
    // for (let i=1; i < communesToDisplay.length; i++) {
    //   fusionCommunes = union(fusionCommunes, communesToDisplay[i]);
    // }
    // var fc2 = {
    //   "type": "FeatureCollection",
    //   "features": [fusionCommunes] // note features has to be an array
    // }
    // console.log([fusionCommunes]);
    // console.log(JSON.stringify([fusionCommunes]).length);
    // // setMapPolygons([fusionCommunes])
    // console.log("on map");
    

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
