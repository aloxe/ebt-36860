'use client'
import Spinner from "@/components/common/spinner";
import TitleButton from "@/components/common/titleButton";
import { ScoreCard } from "@/components/common/scoreCard";
import { useAuth } from "@/context/authcontext";
import { getGeoScore, matchCommunes, processPostcodes, refreshVisited } from "@/helpers/cityutils";
import { getEBTlocation, getVisits, saveCounts, saveVisits } from "@/helpers/dbutils";
import { getCities } from "@/helpers/ebtutils";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { useTranslation } from '@/i18n/client'
import { formatDate } from "@/helpers/time";

const CitiesView = ({ lang, user }: DashboardProps) => {
  /* eslint-disable react-hooks/rules-of-hooks */
  const { t } = useTranslation(lang, 'dashboard');
  const { visited, setVisited } = useAuth();
  const [step, setStep] = useState<number>(0);
  const [cities, setCities] = useState<City[] | undefined>(undefined);
  const [citiesInFrance, setCitiesInFrance] = useState<number | undefined>(undefined);
  const { logout } = useAuth();

  const countFrenchCommunes = useCallback( async () => {
    const citiesFrance = cities && cities.filter((city: City) => city.country == "France");
    if (citiesFrance && citiesFrance?.length > 0) {
      setCitiesInFrance(citiesFrance?.length)
      // split homonyms, add found postcodes
      const visitedLocations: City[] = await processPostcodes(user, citiesFrance);
      // we could save this intermediary step
      // saveVisits(user.id, { fr: visitedLocations })
      const communes = require('@etalab/decoupage-administratif/data/communes.json')
      const EBTLocations = await getEBTlocation();
      const visitedCities: City[] = await matchCommunes(visitedLocations, communes, EBTLocations)
      // we save all fr locations with communes info
      saveVisits(user.id, !user.isFake, { fr: visitedCities })
      const visited = refreshVisited(visitedCities)
      const geoScore = getGeoScore(communes, visited.communes)
      saveCounts(user.id, !user.isFake, { 
        communes: visited.communes,
        departements: visited.departements,
        prefectures: visited.prefectures,
        unknowns: visited.unknowns,
        count: { 
          all: cities.length, 
          fr: citiesInFrance,
          communes: visited.communes.length,
          departements: visited.departements.length,
          prefectures: visited.prefectures.length,
          unknowns: visited.unknowns.length, 
          pop: geoScore.visitedPop,
          surf: geoScore.visitedSurf,
          alt: geoScore.visitedAltMoyenne
        }
      })
      setVisited(visited)
      setStep(3)
    } else {
      setCitiesInFrance(0)
      setStep(3)
    }
  }, [cities]);

  useEffect(() => {
    cities && countFrenchCommunes();
  }, [cities, countFrenchCommunes])

  const handleCityRequest = async (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    setStep(1);
    if (!user.isFake) {
      const response = await getCities(user.sessionid);
      if (!response) {
        // TODO manage better error message
        console.log("error couldn't get cities, please relog in" );
        logout();
        return
      }
      setCities(response.data)
      // saving all world locations as is
      saveVisits(user.id, !user.isFake, { cities: response.data })
      setStep(2)
    } else {
      // Admin user only has user.id, we fetch existing data
      const visitedCities = await getVisits(user.id, 'cities')
      // if cities not available:
      // const visitedCities = await getVisits(user.id, 'fr')
      setCities(visitedCities)
      setStep(2)
    }
  }

  if (step === 0) {
    return (<TitleButton
      label={t('load-locations')}
      href={"#cities"}
      callback={handleCityRequest}
      />)
  }
  return (
    <>
      <div className="group bg-white rounded-lg border border-blue-200 text-left  p-2 m-2 sm:p-4 sm:m-4">
        <div className="flex justify-between">
          <h2>{t('your-locations')}</h2>
          { step > 2 && 
            <div className="text-right text-stone-400 text-sm">{formatDate(lang, "LLL", visited?.date)} 
              <span className="text-right  text-blue-900 text-lg  cursor-pointer" onClick={handleCityRequest}> ⟳ </span>
            </div> 
          }
        </div>
        <div>
          { step === 1 && <><br/><br/><Spinner /> {t('loading-locations')}</>}
          { cities && step > 1 && 
            <>
              <div>🌍 : {t('locations-worldwide', {count: cities.length})}</div>
              {citiesInFrance && !visited && <div>🇫🇷 : {t('locations-in-france', {count: citiesInFrance})}</div>}
              {citiesInFrance === 0 && <div>🇫🇷 : {t('didnt-reccord-in-France')}</div>}
            </>
          }
          {/* {TODO: why don't you start to collect? } */}
          { step === 2 && <><br/><br/><Spinner /> {t('finding-french-communes')}</>}
          { step > 2 && !!citiesInFrance && <>
            <h2>{t('your-french-stats')}</h2>
            <div className="flex flex-wrap justify-between mt-2 sm:max-w-none max-w-[300px]">
              <ScoreCard icon="📍" score={visited?.visitedCities?.length} label={t("location", {count: visited?.visitedCities?.length})} lang={lang} />
              <ScoreCard icon="🏘️" score={visited?.communes?.length} label={t("municipality", {count: visited?.communes?.length})} lang={lang}/ >
              <ScoreCard icon="🇫🇷" score={visited?.departements?.length} label={t("district", {count: visited?.departements?.length})} lang={lang} />
              <ScoreCard icon="🏛️" score={visited?.prefectures?.length} label={t("hq", {count: visited?.prefectures?.length})} lang={lang} />
            </div>
            {visited && visited.unknowns.length > 0 &&
            <>
              <br/>{t("have-unidentified", {count: visited.unknowns.length})}<br/>
              <Link href="#unknown">{t('identify-municipality')}</Link> {t('to-increase-your-score')}</>}
            </>
          }
        </div>
      </div>
    </>
  )
}

export default CitiesView;