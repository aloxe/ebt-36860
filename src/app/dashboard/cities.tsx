'use client'
import Spinner from "@/components/common/spinner";
import { useAuth } from "@/context/authcontext";
import { addPostcodes, matchCommunes } from "@/helpers/cityutils";
import { getEBTlocation } from "@/helpers/dbutils";
import { getCities } from "@/helpers/ebtutils";
import { useCallback, useEffect, useState } from "react";

export function Cities() {
  const { user, logout, cities, setCities, visited, setVisited } = useAuth();
  const [request, setRequest] = useState<any>(undefined);

  const countFrenchCommunes = useCallback( async () => {
    const citiesFrance = cities.data.filter((city: city) => city.country == "France");
    const visitedlocations = [].concat(citiesFrance);
    const communes = require('@etalab/decoupage-administratif/data/communes.json')
    const EBTLocations = await getEBTlocation();
    const visited = await matchCommunes(visitedlocations, communes, EBTLocations)
    sessionStorage.setItem('visited', JSON.stringify(visited));
    setVisited(visited);
  }, [cities, setVisited]);

  useEffect(() => {
    if (cities?.france > 0 && !visited) {
      countFrenchCommunes();
    }
  }, [cities, visited, countFrenchCommunes])

  var d = new Date(cities?.date);
  const date = d.toLocaleString("en-GB", { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })

  const handleCityRequest = async (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    setRequest(true);
    sessionStorage.removeItem('cities');
    setCities(undefined);
    sessionStorage.removeItem('visited');
    setVisited(undefined);
    const cities = await getCities(user);
    if (!cities) {
      // TODO manage better error message
      console.log("error couldn't get cities, please relog in" );
      logout();
      return
    }
    const citiesWorld = await addPostcodes(user, cities.data);
    const citiesFrance = citiesWorld.filter((city: city) => city.country == "France");
    cities.france = citiesFrance.length;
    // TODO sort all countries alike
    cities.date = Date.now();
    setCities(cities)
    sessionStorage.setItem('cities', JSON.stringify(cities));
    setRequest(false);
  }

  return (
    <>
      <div className="bg-white rounded-lg border border-blue-200 text-left text-blue-900 p-4 m-5">
        <div className="flex justify-between">
          {!request && !cities && <a
            onClick={handleCityRequest}
            href="#cities"
            className="px-5 py-4"
          >
            <h2 className={`mb-3 text-lg font-semibold`}>
              Load your locations from EBT{' '}
              <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
                -&gt;
              </span>
            </h2>
          </a>}
          { ((request && !cities) || cities) && <h2>Locations where you found notes</h2>}
          { cities && <div className="text-right text-stone-400 text-sm">{date} 
            <span className="text-right  text-blue-900 text-lg  cursor-pointer" onClick={handleCityRequest}> ⟳ </span></div> }
        </div>
            { request && !cities && <><br/><br/><Spinner /> loading locations from eurobilltracker</> }
            { cities && <>
            🌍 : {cities.rows} locations worldwide
            {cities?.france > 0 && !visited && <div>🇫🇷 : {cities.france} locations in France</div>}
            {cities?.france == 0 && <div>🇫🇷 : You didn&apos;t reccord euro bank notes in France</div>}
            {/* {TODO: why don't you start to collect? } */}
            {cities && !visited && <><br/><br/><Spinner /> finding french communes</>}
            {visited && <h2 className="mt-2">Your french statistics</h2>}
            {visited && <>
            📍 : {cities.france} locations in France
            <br/>🏘️ : <b>{visited.communes.length} french communes</b>
            <br/>🇫🇷 : {visited.departements.length} départements
            <br/>🏛️ : {visited.prefectures?.length} préfectures
            </>
            }
            {visited && visited.unknown > 0 && <><br/><br/>you have {visited.unknown} unidentified locations</>}
          </> }
      </div>
    </>
  )
}
