'use client'
import { useState, useEffect, useRef } from "react";
import { matchCommunes, addPostcodes, splitVisited, refreshVisited } from "../_helpers/cityutils"
import EBTLocations from "../_data/ebtlocation.json"
import Spinner from "../_components/spinner";
import { useAuth } from "../_hooks/authprovider";
import { Dropdown } from "../_components/dropdown";


interface commune {
  "code": string;
  "nom": string;
  "departement": string;
}


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
  "possible"?: commune[];
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

export function Unknowns() {
  const [requestUnknown, setRequestUnknown] = useState<boolean>(false);
  const { visited, setVisited } = useAuth();

    var d = new Date(visited?.date);
  const date = d.toLocaleString("en-GB", { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })

  useEffect(() => {
    console.log(" === use effect === => ", visited);
  }, [])

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


    const handleRequestUnknown = async (event: React.MouseEvent<HTMLAnchorElement>) => {
      event.preventDefault();
      // const unknown = visited.visitedUnknown;
      setRequestUnknown(true);
      console.log("setRequestUnknown");
  }

  function handleDropdownChoice(event: React.MouseEvent<HTMLAnchorElement>) {
    event.preventDefault();
    const newname = event.currentTarget.childNodes[0].nodeValue
    const newcode = event.currentTarget.id 

    // add name on dropdown button
    const DropDownRowSpan = event?.currentTarget.parentNode?.parentNode?.parentNode?.childNodes[0]?.childNodes[0]?.childNodes[0]
    // writte name instead of chooze
    if (DropDownRowSpan) DropDownRowSpan.nodeValue = newname;
    
    // add name and code in form input values
    const codeEl = event?.currentTarget?.parentNode?.parentNode?.parentNode?.parentNode?.parentNode?.parentNode?.children[3];
    const communeEl = event?.currentTarget?.parentNode?.parentNode?.parentNode?.parentNode?.parentNode?.parentNode?.children[4];

    if (communeEl) communeEl.setAttribute("value", newname || "")
    if (codeEl) codeEl.setAttribute("value", newcode)

    const saveButton = event.currentTarget.parentNode?.parentNode?.parentNode?.parentNode?.parentNode?.parentNode?.children[6]
    saveButton?.removeAttribute('disabled')
    const error = event.currentTarget.parentNode?.parentNode?.parentNode?.parentNode?.parentNode?.children[2]
    if (error) error.innerHTML = ""
  }

  const dropdownCommunes = (possibleCommunes:commune[]) => {
    possibleCommunes.map((item:any) => {
      item.label = item.nom,
      item.url = item.code,
      item.action = handleDropdownChoice
    })
    return (<Dropdown label={"chooze"} array={possibleCommunes} />)
  }

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const location = (event.target as HTMLInputElement).getElementsByTagName("input")[0].value
    const departement = (event.target as HTMLInputElement).getElementsByTagName("input")[1].value
    const code = (event.target as HTMLInputElement).getElementsByTagName("input")[2].value
    const commune = (event.target as HTMLInputElement).getElementsByTagName("input")[3].value
    const error = (event.target as HTMLInputElement).getElementsByTagName("span")[1]
    console.log("SAVE");
    console.log(departement + " " +location + "is in: ");
    console.log(code);
    console.log(commune);
      console.log(visited);
      // if no commune or no code : error code
      if (!commune || !code) {
        error.innerHTML = "commune missing, can't save";
        return
      }
      visited.visitedCities.map(function (city:city) {
        if (city.city == location && city.departement == departement) {
          if (city.commune) {
            error.innerHTML = "commune already " + city.commune;
            return
          } else {
            city.code = code
            city.commune = commune
            delete city.possible
          }
        }
      });
//      refreshVisited(visited.visitedCities)
      // update visitedCities
      // update EBTlocations
      // refresh visited → unknown will disapear
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
          { <a
            onClick={handleRequestUnknown}
            href="#cities"
            className="px-5 py-4"
          >
          {!requestUnknown && <h2 className={`mb-3 text-lg font-semibold`}>
            List unknown locations{' '}
            <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
              -&gt;
            </span>
          </h2>}
          </a>}
          { requestUnknown && !visited.visitedUnknown && <><br/><br/><Spinner /></> }
          { requestUnknown && visited?.visitedUnknown && <h2>Locations where you found notes</h2>}

          { visited?.date && <div className="text-right text-stone-400 text-sm">{date}
            <span className="text-right  text-blue-900 text-lg  cursor-pointer"> ⟳ </span></div> }
        </div>
        <div className="">
          {requestUnknown && visited?.visitedUnknown.map((city:city) => {
            const osmUrl = "https://www.openstreetmap.org/search?query=" + city.top_zipcode + " " + city.city;
            return city.possible && <form key={city.departement+" "+city.city} onSubmit={handleSubmit} className="grid grid-cols-3 leading-10 even:bg-indigo-50 ">
                <div className="leading-7 p-5">{city.city} is in 
                  <br /><a href={osmUrl} className="text-[0.7rem] btn btn-secondary" target="_blank">find on 🗺 OSMap</a>
                </div>
                <input type="hidden" value={city.city} name="location" />
                <input type="hidden" value={city.departement} name="departement" />
                <input type="hidden" value="" name="code" />
                <input type="hidden" value="" name="commune" />
                <div className="mt-4 text-center leading-7">{dropdownCommunes(city.possible || [])}
                <br/><span className="error float-left"></span>
                  </div>
                <button className="btn btn-primary h-[40px] max-w-min mx-auto py-0 px-4 mt-4" disabled>Save</button>
            </form>
          })}
        </div>
      </div>
    </>
  )
}
