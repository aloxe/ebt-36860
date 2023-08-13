'use client'
import { useState, useEffect } from "react";

interface city {
  "location": string
  "country": string
  "top_zipcode": string
  "nrlocations": number
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
      method: 'GET',
      // headers: {
      //   'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
      // },
      // body: getRequestBody(params)
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
      console.log(citiesWorld);
      const citiesFrance = citiesWorld.filter((city:city) => city.country == "France");
      console.log(citiesFrance);
      cities.rowsFrance = citiesFrance.length;
      cities.date = Date.now();
      localStorage.setItem('cities', JSON.stringify(cities));
      setCities(cities)
    } else {
      // TODO manage error
      console.log("no cities");
    }
  }

  if (!cities) {
    return (
      <div className="mb-32 grid text-center md:mb-0 md:grid-cols-1 md:text-left">
        <a
          onClick={handleRequest}
          href="#cities"
          className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
        >
          <h2 className={`mb-3 text-2xl font-semibold`}>
            Load your cities{' '}
            <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
              -&gt;
            </span>
          </h2>
        </a>
      </div>
    )
  } else {

  return (
    <>
      <div className="bg-white rounded-lg border border-blue-200 text-left text-blue-900 p-4 m-5">
        <div className="flex justify-between">
          <h2>Cities where you found notes</h2>
          <div className="text-right text-stone-400 text-sm">{date} <span className="text-right  text-blue-900 text-lg">⟳</span></div>

        </div>
        <p>
          <br />🌍 cities worldwide: {cities.rows}
          <br />🇫🇷 cities in France: {cities.rowsFrance}
        </p>
      </div>
      <Cities />
    </>
  )
  }
}
