'use client'
import { Dropdown } from "@/components/common/dropdown";
import { refreshVisited } from "@/helpers/cityutils";
import { saveEBTlocation } from "@/helpers/dbutils";
import { useMemo } from "react";

interface UnknownsViewProps {
    visited: Visited,
    user: User,
    saveVisited: any
}

export function UnknownsView({visited, user, saveVisited}: UnknownsViewProps) {
//   const { visited, user, setVisited} = useAuth();
  let myVisited = {...visited};
  var d = new Date(myVisited?.date || Date());
  const date = d.toLocaleString("en-GB", { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })

  const visitedUnknown = useMemo(() => myVisited.visitedCities.filter((city: City) => !city.code),
[myVisited.visitedCities]);

  function handleDropdownChoice(event: React.MouseEvent<HTMLAnchorElement>) {
    event.preventDefault();
    const myform = event?.currentTarget.parentNode?.parentNode?.parentNode?.parentNode?.parentNode?.parentNode
    const DropDownRowSpan = event?.currentTarget.parentNode?.parentNode?.parentNode?.childNodes[0]?.childNodes[0]?.childNodes[0]

    const newname = event.currentTarget.childNodes[0].nodeValue
    const newcode = event.currentTarget.id

    // writte name instead of choose
    if (DropDownRowSpan) DropDownRowSpan.nodeValue = newname;

    // add name and code in hidden input values
    // @ts-ignore
    const communeEl = myform?.commune;
    if (communeEl) communeEl.setAttribute("value", newname || "")
    // @ts-ignore
    const codeEl = myform?.code;
    if (codeEl) codeEl.setAttribute("value", newcode)

    // unfocus button and unable save
    event.currentTarget.blur()
    // @ts-ignore
    const saveButton = myform?.save;
    saveButton?.removeAttribute('disabled')

    // @ts-ignore clean error
    const error = myform?.error
    if (error) error.innerHTML = ""
  }

  const dropdownCommunes = (possibleCommunes: Commune[]) => {
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

      myVisited.visitedCities.map(async function (city: City) {
        if (city.city == location && city.departement == departement) {
          if (city.commune) {
            feedback.className = "error"
            feedback.innerHTML = "commune already " + city.commune;
            return
          } else {
            city.code = code
            city.commune = commune
            city.possible = undefined
            delete city.possible
            const newEBTlocation:any = {
              "code_postal": city.top_zipcode,
              "code_commune": city.code,
              "nom_ebt": city.city,
              "nom_commune": city.commune,
              "ref_user": user?.username || user?.id || user
            };
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
      // visitedCities has changed we need to update all visited
      const myFreshVisited= await refreshVisited(myVisited.visitedCities)
      saveVisited(myFreshVisited)
      // TODO do we still use storage for Visited?
  }

  return (
    <>
      <div className="bg-white rounded-lg border border-blue-200 text-left text-blue-900 p-2 m-2 sm:p-4 sm:m-4">
        <div className="flex justify-between">
          <h2>Unknown commune you visited</h2>
          {myVisited?.date && <div className="text-right text-stone-400 text-sm">
            {date}
          </div>}
        </div>
        <div className="text-sm text-stone-600 my-1">
          Find out in which commune is the location you visited with the map. Choose it in the list of possible communes and save this choice for next time.
        </div>
        <div className="table w-full">
          {visitedUnknown.map((city: City) => {
            const osmUrl = "https://www.openstreetmap.org/search?query=" + city.top_zipcode + " " + city.city;
            return city.possible && <form key={city.departement+" "+city.city} onSubmit={handleSubmit} className="table-row even:bg-indigo-50">
                <div className="table-cell min-w-max pb-4 align-top pt-2">{city.city}<br/>
                <div className="h-3"></div>
                  <a href={osmUrl} className="text-[0.7rem] btn btn-secondary" target="_blank">find on 🗺 OSMap</a>
                <input type="hidden" value={city.city} name="location" id="location" />
                <input type="hidden" value={city.departement} name="departement"  id="departement"/>
                <input type="hidden" value="" name="code"  id="code" />
                <input type="hidden" value="" name="commune" id="commune" />
                </div>
                <div className="sm:table-cell px-6 min-w-max whitespace-nowrap align-top pt-2 hidden">
                  is in
                </div>
                <div className="table-cell float-left">
                  {dropdownCommunes(city.possible || [])}
                  <br/><span id="error" className="error float-left"></span>
                </div>
                <div className="table-cell">
                  <button className="btn max-w-min mx-auto m-5 p-0 sm:btn-primary sm:px-4 sm:h-[40px]" id="save" disabled>
                    <span className="sm:hidden">💾</span>
                    <span className="hidden sm:inline-block">Save</span>
                  </button>
                </div>
            </form>
          })}
        </div>
      </div>
    </>
  )
}
