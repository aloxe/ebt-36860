'use client'
import { useState, useEffect, useCallback } from "react";
import { useAuth } from "../_hooks/authprovider"
import { matchCommunes, addPostcodes } from "../_helpers/cityutils"
import { getCities } from "../_helpers/ebtutils"
import Spinner from "../_components/spinner";

interface city {
  "code"?: string;
  "commune"?: string;
  "possible"?: any[];
  "city": string,
  "country": string,
  "top_zipcode": string,
  "nrlocations": number,
  "postcodes": string[],
  "departement": string,
  "samePostcode"?: string[]
}

export function Cities() {
  const { user, setUser } = useAuth();
  const [request, setRequest] = useState<any>(undefined);
  const [cities, setCities] = useState<any>(undefined);
  const [visited, setVisited] = useState<any>(undefined);

  const countFrenchCommunes = useCallback( async () => {
    const visitedlocations = [].concat(cities.france);
    const communes = require('@etalab/decoupage-administratif/data/communes.json')
    const EBTLocations = require("@/app/_data/ebtlocation.json")
    const visited = await matchCommunes(visitedlocations, communes, EBTLocations)
    console.log("we have visited", visited);
    setVisited(visited);
  }, [cities]);

  useEffect(() => {
    console.log(" === use effect === ");

    const storeUser = typeof window !== 'undefined' && JSON.parse(localStorage.getItem('user') || "{}");
    storeUser.username && setUser(storeUser);

    const storeCities = typeof window !== 'undefined' && JSON.parse(localStorage.getItem('cities') || "{}");
    storeCities.length && setCities(storeCities);

    if (cities?.france && !visited) {
      countFrenchCommunes();
    }
  }, [cities, visited, countFrenchCommunes, setUser])

  var d = new Date(cities?.date);
  const date = d.toLocaleString("en-GB", { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })

  const handleCityRequest = async (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    setRequest(true);
    const cities = await getCities(user);
    const citiesWorld = await addPostcodes(user, cities.data);
    const citiesFrance = citiesWorld.filter((city: city) => city.country == "France");
    cities.france = citiesFrance;
    // TODO sort all countries alike
    cities.date = Date.now();
    setCities(cities)
    localStorage.setItem('cities', JSON.stringify(cities));
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
              Load your cities{' '}
              <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
                -&gt;
              </span>
            </h2>
          </a>}
          { request && !cities && <><br/><br/><Spinner /></> }
          { cities && <h2>Locations where you found notes</h2>}

          { cities && <div className="text-right text-stone-400 text-sm">{date} 
            <span className="text-right  text-blue-900 text-lg  cursor-pointer" onClick={handleCityRequest}> ⟳ </span></div> }
        </div>
            { cities && <>
            <br />🌍 : {cities.rows} locations worldwide
            <br />🇫🇷 : {cities.france.length} locations in France 
            {!visited && <><br/><br/><Spinner /></>}
            {visited && <br/>}
            {visited && `${visited.visitedKnown.length}  identified in ${visited.visitedCommunes.length} french communes`}
            {visited && <><br/><br/></> }
            {visited && visited.visitedUnknown.length > 0 && `you have ${visited.visitedUnknown.length} unidentified locations`}
          </> }
        {visited && <h2> {visited.visitedCommunes.length} communes in 🇫🇷 France</h2>}
        {cities && !cities.date && <Spinner />}
        {cities?.rien && !visited &&
          <a
            onClick={countFrenchCommunes}
            href="#cities"
            className="px-5 py-4"
          >
            <h2 className={`mb-3 text-lg font-semibold`}>
              Count french communes{' '}
              <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
                -&gt;
              </span>
            </h2>
            {visited?.visitedUnknown?.length}
          </a>
        }
      </div>
    </>
  )
}
