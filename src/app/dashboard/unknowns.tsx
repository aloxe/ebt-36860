'use client'
import { useMemo } from "react";
import { useAuth } from "@/hooks/authprovider";
import { Dropdown } from "@/components/common/dropdown";


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

export function Unknowns() {
  const { visited, user } = useAuth();

    var d = new Date(visited?.date);
  const date = d.toLocaleString("en-GB", { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })

  const visitedUnknown = useMemo(() => visited.visitedCities.filter((city: city) => !city.code),
[visited.visitedCities]);

const saveEBTlocation = async (newLocation:any) => {

    // TODO factorise this one
    function getRequestBody(body: any) {
      var bodyArray: String[] = [];
      for (var property in body) {
        var encodedKey = encodeURIComponent(property);
        var encodedValue = encodeURIComponent(body[property]);
        bodyArray.push(encodedKey + "=" + encodedValue);
      }
      return bodyArray.join("&");
    }

    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
      }
    };
    const requestDetail = getRequestBody(newLocation)

    // api bellow is rewritting to EBTlocations
    const response = await fetch(`/api/staticdata/?${requestDetail}`, requestOptions)
      .catch(function (err) {
        console.log('Fetch Error :-S', err);
        return null;
      });

    const dataresult = await response?.json();
    return dataresult;
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
    return (<Dropdown label={"choose"} array={possibleCommunes} />)
  }

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const location = (event.target as HTMLInputElement).getElementsByTagName("input")[0].value
    const departement = (event.target as HTMLInputElement).getElementsByTagName("input")[1].value
    const code = (event.target as HTMLInputElement).getElementsByTagName("input")[2].value
    const commune = (event.target as HTMLInputElement).getElementsByTagName("input")[3].value
    const feedback = (event.target as HTMLInputElement).getElementsByTagName("span")[1]

      // if no commune or no code : error code
      if (!commune || !code) {
        feedback.className = "error"
        feedback.innerHTML = "commune missing, can't save";
        return
      }
      visited.visitedCities.map(async function (city:city) {
        if (city.city == location && city.departement == departement) {
          if (city.commune) {
            feedback.className = "error"
            feedback.innerHTML = "commune already " + city.commune;
            return
          } else {
            city.code = code
            city.commune = commune
            delete city.possible

            const newEBTlocation:any = {
              "codePostal": city.top_zipcode,
              "codeCommune": city.code,
              "nomEBT": city.city,
              "nomCommune": city.commune,
              "ref": user.name
            };
            // TODO make asyn
            const response = await saveEBTlocation(newEBTlocation)
            if (!response) {
              feedback.className = "error"
              feedback.innerHTML = "network error, didn't save";
            }
            feedback.className = "message"
            feedback.innerHTML = city.commune + " enregistrée";
          }
        }
      });
  }

  return (
    <>
      <div className="bg-white rounded-lg border border-blue-200 text-left text-blue-900 p-4 m-5">
        <div className="flex justify-between">
          { visited?.unknown > 0 && <h2>Locations you visited without identified commune</h2>}
          { visited?.date && <div className="text-right text-stone-400 text-sm">{date}
          </div>}
        </div>
        <div className="">
          {visitedUnknown.map((city:city) => {
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
