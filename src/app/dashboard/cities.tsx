'use client'
import { useState, useEffect, useCallback } from "react";
import { matchCommunes } from "../_helpers/cityutils"
import EBTLocations from "../_data/ebtlocation.json"
import Spinner from "../_components/spinner";

interface city {
  "code"?: string;
  "commune"?: string;
  "city": string,
  "country": string,
  "top_zipcode": string,
  "nrlocations": number,
  "postcodes": string[],
  "departement": string,
  "samePostcode"?: string[]
}

interface user {
  "sessionid": string
  "username": string
  "my_city": string[]
  "my_country": string
  "my_zip": string
  "totalbills": number
  "totalhits": number
  "email": string
  "date": string
}

export function Cities() {
  const [user, setUser] = useState<any>(undefined);
  const [cities, setCities] = useState<any>(undefined);
  const [visited, setVisited] = useState<any>(undefined);

  const countFrenchCommunes = useCallback( async () => {
    let visitedlocations = [].concat(cities.france);
    console.log(visitedlocations);
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
  }, [cities, visited, countFrenchCommunes])

  var d = new Date(cities?.date);
  const date = d.toLocaleString("en-GB", { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })

  const handleRequest = async (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();

    const requestOptions = {
      method: 'GET'
    };

    const response = await fetch(`/api/eurobilltracker/?m=mycities&v=1&PHPSESSID=${user.sessionid}`, requestOptions)
      .catch(function (err) {
        console.log('Fetch Error :-S', err);
        return null;
      });

    const cities = await response?.json();

    if (cities) {
      const citiesWorld = cities.data;
      citiesWorld.map(async (city: city) => {
        if (city.nrlocations > 1) {
          var postcodesArray = await getPostcodes(user, city);
          city.postcodes = postcodesArray;
        } else {
          city.postcodes = [city.top_zipcode];
        }
        // useerful french division
        city.departement = city.top_zipcode.substring(0,2)
      });

      const citiesFrance = citiesWorld.filter((city: city) => city.country == "France");
      cities.france = citiesFrance;
      // TODO sort all countries alike
      cities.date = Date.now();
      localStorage.setItem('cities', JSON.stringify(cities));
      setCities(cities)
    } else {
      // TODO manage error
      console.log("error, no cities");
    }
  }

  const getPostcodes = async (user: user, city: city) => {
    const responsePostcodes = await fetch(`/api/eurobilltracker/?m=myzipcodes&v=1&PHPSESSID=${user.sessionid}&city=${city.city}&country=${city.country}`)
      .catch(function (err) {
        console.log('Fetch Error :-S', err);
        return null;
      });
    const postcodes = await responsePostcodes?.json();
    // console.log(city.city);
    // return array of postcodes instead of array or objects
    var postcodesArray = postcodes.data.map(function (el:{zipcode: string}) {
      return el.zipcode;
    })
    return postcodesArray;
  }

  const fetchData = async () => {
    console.log(" click EBTLocations");
    console.log(EBTLocations);

    function getRequestBody(body: any) {
      var bodyArray: String[] = [];
      for (var property in body) {
        var encodedKey = encodeURIComponent(property);
        var encodedValue = encodeURIComponent(body[property]);
        bodyArray.push(encodedKey + "=" + encodedValue);
      }
      return bodyArray.join("&");
    }

    const params = {
        "codePostal": "CODE POSTAL",
        "codeCommune": "CODE INSEE",
        "nomEBT": "NOM EBT",
        "nomCommune": "NOM COMMUNE",
        "ref": "REF"
    };

    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
      },
      body: getRequestBody(params)

    };
    const requestDetail = getRequestBody(params)

    const response = await fetch(`/api/staticdata/?${requestDetail}`, requestOptions)
      .catch(function (err) {
        console.log('Fetch Error :-S', err);
        return null;
      });

    console.log("response=", response);

    const dataresult = await response?.json();
    console.log("data= ", dataresult);
  }

  return (
    <>
      <a
        onClick={fetchData}
        href="#cities"
        className="px-5 py-4"
      >
        <h2 className={`mb-3 text-lg font-semibold`}>
          fetch and write ebt location{' '}
          <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
            -&gt;
          </span>
        </h2>
      </a>
      <div className="bg-white rounded-lg border border-blue-200 text-left text-blue-900 p-4 m-5">
        <div className="flex justify-between">
          { cities ? <h2>Locations where you found notes</h2> :
            <a
              onClick={handleRequest}
              href="#cities"
              className="px-5 py-4"
            >
              <h2 className={`mb-3 text-lg font-semibold`}>
                Load your cities{' '}
                <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
                  -&gt;
                </span>
              </h2>
            </a>
          }
          { cities && <div className="text-right text-stone-400 text-sm">{date} <span className="text-right  text-blue-900 text-lg">⟳</span></div> }
        </div>
            { cities && <p>
            <br />🌍 worldwide: {cities.rows} locations
            <br />🇫🇷 in France: {cities.france.length} locations {visited && `${visited.visitedKnown.length} identified in ${visited.visitedCommunes.length} french communes`}
            <br />{visited && visited.visitedUnknown.length > 0 && `you have ${visited.visitedUnknown.length} unidentified locations`}
          </p> }
        {cities && !visited && <Spinner />}
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
          </a>
        }
      </div>
    </>
  )
}
