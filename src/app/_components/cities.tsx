'use client'
import { useState, useEffect } from "react";
import { hasSamePostcode } from "../_helpers/cityutils"
import { sansAccent, countryCodeToFlag } from "../_helpers/strings"
import EBTLocations from "../_data/ebtlocation.json"

interface city {
  "code"?: string;
  "commune"?: string;
  "city": string,
  "country": string,
  "top_zipcode": string,
  "nrlocations": number,
  "postcodes": string[],
  "departement": string
}

interface commune {
  "arrondissement": string
  "code": string
  "codesPostaux": string[]
  "departement": string
  "nom": string
  "population": number
  "rangChefLieu": number
  "region": string
  "siren": string
  "type": "commune-actuelle" | "commune-déléguée" | ""
  "typeLiaison": number
  "zone": "metro" | "drom"
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
  const [cities, setCities] = useState<any>(undefined);
  const [user, setUser] = useState<any>(undefined);

  useEffect(() => {
    const storeUser = typeof window !== 'undefined' && JSON.parse(localStorage.getItem('user') || "{}");
    storeUser.username && setUser(storeUser);

    const storeCities = typeof window !== 'undefined' && JSON.parse(localStorage.getItem('cities') || "{}");
    storeCities.length && setCities(storeCities);
  }, [])

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
    console.log(cities);
      
    if (cities) {
      const citiesWorld = cities.data;
      citiesWorld.map(async (city: city) => {
        if (city.nrlocations > 1) {
          var postcodesArray = await getPostcodes(user, city);
          city.postcodes = postcodesArray;
        } else {
          city.postcodes = [city.top_zipcode];
        }
        city.departement = city.top_zipcode.substring(0,2)

      });

      const citiesFrance = citiesWorld.filter((city: city) => city.country == "France");
      console.log("en France → ", citiesFrance);
      cities.france = citiesFrance;
      // TODO sort all countries alike
      cities.date = Date.now();
      localStorage.setItem('cities', JSON.stringify(cities));
      setCities(cities)
    } else {
      // TODO manage error
      console.log("no cities");
    }
  }

  const handleCommuneRequest = async (event: React.MouseEvent<HTMLAnchorElement>) => {
    const communes: commune[] = require('@etalab/decoupage-administratif/data/communes.json')
    console.log("click!", communes);
    console.log(cities.france);
    
    console.log(communes[12].codesPostaux);
    

    const visitedCommunes: city[] = cities.france;

    visitedCommunes.map(function (city: city) {
      // check same name + dept
      var foundCommune = communes.find((commune) => city.city == commune.nom 
        && city.departement == commune.departement)
      city.code = foundCommune ? foundCommune.code : undefined;
    });

    visitedCommunes.map(function (city: city) {
      if (!city.code) {
      // check same name no diacritics + dept
        var foundCommune = communes.find((commune) => sansAccent(city.city) == sansAccent(commune.nom) 
          && city.departement == commune.departement)
      city.code = foundCommune ? foundCommune.code : undefined;
      foundCommune && console.log(city.city + " ←→ " + foundCommune.nom);
      }
    });

    visitedCommunes.map(function (city: city) {
      if (!city.code) {
        // check name included + dept + postcode
        var foundCommune = communes.find((commune) => commune.nom.includes(city.city)
          && city.departement == commune.departement
          && hasSamePostcode(city.postcodes, commune.codesPostaux || []))
        city.code = foundCommune ? foundCommune.code : undefined;
        city.commune = foundCommune ? foundCommune.nom : undefined;
      }
    });

    visitedCommunes.map(function (city: city) {
      if (!city.code && city.postcodes.length == 1) {
        // check postcode if only one
        // console.log("city=" + city.city + " " + city.postcodes[0]);
        const samePostcode = communes.filter((commune) => city.departement == commune.departement
          && hasSamePostcode(city.postcodes, commune.codesPostaux || []))
        if (samePostcode.length ==1) {
          city.code = samePostcode[0].code;
          city.commune = samePostcode[0].nom;
          console.log("city=" + city.city + " " + city.postcodes[0]);
        } else {
          console.log("city=" + city.city + " " + city.postcodes[0]);
          console.log(samePostcode);
          
        }
      }
    });

    console.log(visitedCommunes);

    const visitedCommunes1 = visitedCommunes.filter(city => city.code)
    console.log("all", visitedCommunes1);

    const visitedCommunes2 = visitedCommunes.filter(city => !city.code)
    console.log("reste", visitedCommunes2);

    const visitedCommunes5 = visitedCommunes2.filter(function (city: city) {
      return communes.some((commune) => commune.nom.includes(city.city) && city.departement == commune.departement)
    });
    console.log(visitedCommunes5);

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
  }

  return (
    <>
      <a
        onClick={fetchData}
        href="#cities"
        className="px-5 py-4"
      >
        <h2 className={`mb-3 text-lg font-semibold`}>
          fetch data{' '}
          <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
            -&gt;
          </span>
        </h2>
      </a>

      <div className="bg-white rounded-lg border border-blue-200 text-left text-blue-900 p-4 m-5">
        <div className="flex justify-between">
          { cities ? <h2>Cities where you found notes</h2> : 
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
          <br />🌍 cities worldwide: {cities.rows}
          <br />🇫🇷 cities in France: {cities.france.length}
        </p> }
        {cities &&
          <a
            onClick={handleCommuneRequest}
            href="#cities"
            className="px-5 py-4"
          >
            <h2 className={`mb-3 text-lg font-semibold`}>
              Load french communes{' '}
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
