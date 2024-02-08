'use client'
import dynamic from 'next/dynamic';
import Spinner from "@/components/common/spinner";
import '@/components/maps/usermap.css';
import { useEffect, useState } from "react";
import { useTranslation } from '@/i18n/client'
import { makeUserPolygons } from "@/helpers/maputils";
import { FullScreenButton } from "@/components/stats/fullScreenButton";
import { Dropdown } from '@/components/common/dropdown';
import { getCounts } from '@/helpers/dbutils';
import { fetchAllComplete, getDepartement } from '@/helpers/cityutils';


// necessary to avoid server rendering of this part
const DynamicMyMapComponent = dynamic(() =>
  import('@/components/maps/map').then((module) => module.MyMapComponent))

export function DeptMapView({ lang, user }: DashboardProps) {
  /* eslint-disable react-hooks/rules-of-hooks */
  const { t } = useTranslation(lang, 'dashboard');
  const [communes, setCommunes] = useState<string[] | undefined>(undefined);
  const [allCommunes, setAllCommunes] = useState<Commune[] | undefined>(undefined);
  const [departement, setDepartement] = useState<any>(undefined);
  const [mapPolygons, setMapPolygons] = useState<any>(undefined);
  const [dptPolygons, setDptPolygons] = useState<any>(undefined);
  const [fullscreen, setFullscreen] = useState<boolean>(false);

  const dropdownDepartements = () => {
    const allDepartements: Departement[] = require('@etalab/decoupage-administratif/data/departements.json')
    const departements = allDepartements.filter(d => d.code !== "984" && d.code !== "989")
    departements.map((item:any) => {
      item.label = `${item.nom} (${getDepartement(item.code)})`,
      item.url = item.code,
      item.action = handlechooseDpt
    })
    return (<Dropdown label={t('all')} array={departements} />)
  }

  const handlechooseDpt = (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    // reset polygons to clear previous map
    setDptPolygons(undefined)
    setMapPolygons(undefined)
    const DropDownRowSpan = event?.currentTarget.parentNode?.parentNode?.parentNode?.childNodes[0]?.childNodes[0]?.childNodes[0]
    const newname = event.currentTarget.childNodes[0].nodeValue
    const newcode = event.currentTarget.id

    setDepartement(newcode)
    // write name on choose span
    if (DropDownRowSpan) DropDownRowSpan.nodeValue = newname;
    // unfocus button and unable save
    event.currentTarget.blur()
  }


  useEffect(() => {
    if (allCommunes && communes && departement) {
      const getPolygonsAwaited = async (comms: string[]) => {
        const communesToDisplay = await makeUserPolygons(comms, departement)
        setMapPolygons(communesToDisplay)
      }
      const getAllDptPolygonsAwaited = async () => {
        const allCommunesInDept = allCommunes.filter(c => getDepartement(c.code) === departement && !c.chefLieu)
        const communesInDept = allCommunesInDept.map(el => el.code)
        const polygonsInDept = await makeUserPolygons(communesInDept, departement)
        setDptPolygons(polygonsInDept)
      }
      getAllDptPolygonsAwaited()

      const communesInDept = communes.filter(c => getDepartement(c) === departement)
      getPolygonsAwaited(communesInDept)
    }

  }, [allCommunes, communes, departement, user.id])


  useEffect(() => {
    if (!communes) {
      const getCommunesAwaited = async () => {
        // TODO add prefecture to say if it is there
        const counts = await getCounts(user.id, "communes,departements");
        const communes = JSON.parse(counts?.communes)
        setCommunes(communes)
      }
      getCommunesAwaited()
    }
  }, [communes, user.id])

  useEffect(() => {
    if (!allCommunes) {
      const getAllCommunesAwaited = async () => {
        const allCommunesWithDomTom: Commune[] = await fetchAllComplete();
        setAllCommunes(allCommunesWithDomTom)
      }
      getAllCommunesAwaited()
    }
  }, [allCommunes])

  const allowScrollZoom = () => {
    setFullscreen(!fullscreen)
  }

  const canShow = mapPolygons && departement && dptPolygons
  return (
    <div className="bg-white rounded-lg border border-blue-200 text-left text-blue-900 p-2 m-2 sm:p-4 sm:m-4">
      <div className="flex justify-between">
        <h2>{user.username} map</h2>
        <FullScreenButton allowScrollZoom={allowScrollZoom} />
      </div>
      <div className="md:flex md:justify-around
      group-[.fullscreen]:text-xs group-[.fullscreen]:absolute group-[.fullscreen]:top-[96px] group-[.fullscreen]:left-[58px] group-[.fullscreen]:z-[550] group-[.fullscreen]:text-left
      ">
        <div className="my-[0.125rem] inline-block min-h-[1.5rem] pl-[1.5rem]
        group-[.fullscreen]:block group-[.fullscreen]:pl-[0.125rem] dropdown-dept">
          {<div className="my-[0.125rem] inline-block min-h-[1.5rem] pl-[1.5rem] group-[.fullscreen]:block group-[.fullscreen]:pl-[0.125rem] z-1000">{dropdownDepartements()}</div>}
        </div>
      </div>
      <div className="w-full h-90 overflow-hidden text-center">
        {/* adding key to allow loading of a new map instance */}
        {canShow && (
          <DynamicMyMapComponent key={departement} departements={["single"]} dataCommunes={mapPolygons} showDep={true} showCom={true} allowScrollZoom={fullscreen} dptPolygons={dptPolygons}/>
        )}
        {!canShow && departement && <div className='mt-12 relative'><Spinner /></div>}
        {!departement && <div className='mt-12 relative'>pick département</div>}
      </div>
    </div>
    )
}
