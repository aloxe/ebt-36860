'use client'
import Spinner from "@/components/common/spinner";
import TitleButton from "@/components/common/titleButton";
import { ScoreCard } from "@/components/common/scoreCard";
import { useAuth } from "@/context/authcontext";
import { addPostcodes, matchCommunes } from "@/helpers/cityutils";
import { getEBTlocation } from "@/helpers/dbutils";
import { getCities } from "@/helpers/ebtutils";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { useTranslation } from '@/i18n/client'

export function CitiesView({ lang, user, visited, saveVisited }: DashboardCardProps) {
  /* eslint-disable react-hooks/rules-of-hooks */
  const { t } = useTranslation(lang, 'dashboard');
  const [step, setStep] = useState<number>(0);
  const [cities, setCities] = useState<City[] | undefined>(undefined);
  const [citiesInFrance, setCitiesInFrance] = useState<number | undefined>(undefined);
  const { logout } = useAuth();

  var d = visited?.date ? new Date(visited.date) : undefined;
  const date = d?.toLocaleString("en-GB", { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }) ?? "not now"


  const countFrenchCommunes = useCallback( async () => {
    const citiesFrance = cities && cities.filter((city: City) => city.country == "France");
    if (citiesFrance && citiesFrance?.length > 0) {
      setCitiesInFrance(citiesFrance?.length)
      const visitedlocations = [...citiesFrance];
      const communes = require('@etalab/decoupage-administratif/data/communes.json')
      const EBTLocations = await getEBTlocation();
      const visited: Visited = await matchCommunes(visitedlocations, communes, EBTLocations)
      // sessionStorage.setItem('visited', JSON.stringify(visited));
      // await savePlayerData({user, visited, polygon: null})
      // visited.userId = user.id
      saveVisited(visited);
      setStep(3)
    } else {
      setCitiesInFrance(0)
      setStep(3)
    }
  }, [cities, saveVisited, setStep]);

  useEffect(() => {
    cities && countFrenchCommunes();
}, [cities, countFrenchCommunes])

const handleCityRequest = async (event: React.MouseEvent<HTMLAnchorElement>) => {
  event.preventDefault();
  setStep(1);
  const response = await getCities(user);
  if (!response) {
    // TODO manage better error message
    console.log("error couldn't get cities, please relog in" );
    logout();
    return
  }

  const citiesWorld = await addPostcodes(user, response.data);
  setCities(citiesWorld)
  setStep(2)
}


  return (
    <>
      { step === 0 && 
      <TitleButton
      label={t('load-locations')}
      href={"#cities"}
      callback={handleCityRequest}
      />}
      { step > 0 &&
      <div className="group bg-white rounded-lg border border-blue-200 text-left  p-2 m-2 sm:p-4 sm:m-4">
        <div className="flex justify-between">
          <h2>{t('your-locations')}</h2>
          { step > 2 && 
            <div className="text-right text-stone-400 text-sm">{date} 
              <span className="text-right  text-blue-900 text-lg  cursor-pointer" onClick={handleCityRequest}> ⟳ </span>
            </div> 
          }
        </div>
        <div>
          { step === 1 && <><br/><br/><Spinner /> {t('loading-locations')}</>}
          { cities && step > 1 && 
            <>
              <div>🌍 : {t('locations-worldwide', {cities: cities.length})}</div>
              {citiesInFrance && !visited && <div>🇫🇷 : {t('locations-in-france', {cities: citiesInFrance})}</div>}
              {citiesInFrance === 0 && <div>🇫🇷 : {t('didnt-reccord-in-France')}</div>}
            </>
          }
          {/* {TODO: why don't you start to collect? } */}
          { step === 2 && <><br/><br/><Spinner /> {t('finding-french-communes')}</>}
          { step > 2 && !!citiesInFrance && <>
            <h2>{t('your-french-stats')}</h2>
            <div className="flex flex-wrap justify-between mt-2 sm:max-w-none max-w-[300px]">
              <ScoreCard icon="📍" score={visited?.visitedCities?.length} label={t("location", {count: visited?.visitedCities?.length})} />
              <ScoreCard icon="🏘️" score={visited?.communes?.length} label={t("municipality", {count: visited?.communes?.length})} />
              <ScoreCard icon="🇫🇷" score={visited?.departements?.length} label={t("district", {count: visited?.departements?.length})} />
              <ScoreCard icon="🏛️" score={visited?.prefectures?.length} label={t("hq", {count: visited?.prefectures?.length})} />
            </div>
            {visited.unknown > 0 &&
            <>
              <br/>{t("have-unidentified", {number: visited.unknown})}<br/>
              <Link href="#unknown">{t('identify-municipality')}</Link> {t('to-increase-your-score')}</>}
            </>
          }
        </div>
      </div>
      }
    </>
  )
}