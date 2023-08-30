'use client'
import { useState, useEffect, useRef } from "react";
import { matchCommunes, addPostcodes } from "../_helpers/cityutils"
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

  const departement = useRef(null);
  const location = useRef(null);
  const code = useRef(null);
  const commune = useRef(null);

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
    const DropDownRowSpan = event?.currentTarget?.parentNode?.parentNode?.parentNode?.children[0]?.children[0]?.children[0];
    if (DropDownRowSpan) DropDownRowSpan.nodeValue = newname;
    
    // add name and code in form input values
    const codeEl = event?.currentTarget?.parentNode?.parentNode?.parentNode?.parentNode?.parentNode?.parentNode?.children[3];
    const communeEl = event?.currentTarget?.parentNode?.parentNode?.parentNode?.parentNode?.parentNode?.parentNode?.children[4];
// const communeEl = (event.target as HTMLInputElement).getElementsByTagName("input")[2]
console.log(communeEl, codeEl);

    if (communeEl) communeEl.setAttribute("value", newname || "")
    if (codeEl) codeEl.setAttribute("value", newcode)
    // if (codeEl) codeEl.nodeValue = newcode + "toto"
  }

  const dropdownCommunes = (possibleCommunes:commune[]) => {
    const array = possibleCommunes.map((item:any) => {
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
    console.log("SAVE");
    console.log(location);
    console.log(departement);
    console.log(code);
    console.log(commune);
        const newname = event.currentTarget.childNodes[0].nodeValue
    console.log(event.currentTarget.childNodes[0].childNodes[5].childNodes[0].childNodes[0].childNodes[0].childNodes[0].innerText);
    
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
            return <form key={city.departement+" "+city.city} onSubmit={handleSubmit}>
              <div className="grid grid-cols-3 leading-10 even:bg-indigo-50 ">
                <h3 className="p-5">{city.city} is in </h3>
                <input type="hidden" value={city.city} name="location" />
                <input type="hidden" value={city.departement} name="departement" />
                <input type="hidden" value="" name="code" />
                <input type="hidden" value="" name="commune" />
                {city.possible && <div className="mt-4 text-center">{dropdownCommunes(city.possible)}</div>}
                <button className="btn btn-primary h-[40px] max-w-min mx-auto py-0 px-4 mt-4">Save</button>
                {/* {city?.possible ? 
                city.possible.map( (commune:commune) => { return <>{commune.code}, {commune.nom}</>})
                : <div>népô</div>} */}
              </div>
            </form>
          })}
        </div>
      </div>
    </>
  )
}
