'use client'
import { Dropdown } from "@/components/common/dropdown";
import { getCommuneFromCode, getDepartement, getGeoScore, refreshVisited } from "@/helpers/cityutils";
import { getCounts, saveCounts, saveEBTlocation } from "@/helpers/dbutils";
import Link from "next/link";
import { useTranslation } from '@/i18n/client'

const UnknownsView = ({lang, user, visitedCities, setVisited}: {lang: string, user: User, visitedCities: City[], setVisited: any }) => {
  /* eslint-disable react-hooks/rules-of-hooks */
  const { t } = useTranslation(lang, 'dashboard');

  const visitedUnknown = visitedCities.filter((city: City) => !city.code);

  const communes = require('@etalab/decoupage-administratif/data/communes.json')

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
      item.label = `${item.nom}`,
      item.url = item.code,
      item.action = handleDropdownChoice
    })
    return (<Dropdown label={t('choose')} array={possibleCommunes} />)
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
        feedback.innerHTML = t('commune-not');
        return
      }
      visitedCities.map(async function (city: City) {
        if (city.city == location && getDepartement(city.top_zipcode) === departement) {
          if (city.commune) {
            feedback.className = "error"
            feedback.innerHTML = t('commune-already') + " " + city.commune;
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
              feedback.innerHTML = t('network-error');
            }
            feedback.className = "message"
            feedback.innerHTML = city.commune + " " + t('saved');;
          }
        }
      });
      // visitedCities has changed we need to update all depending data
      const myFreshVisited = await refreshVisited(visitedCities)
      const count = await getCounts(user.id, "count")
      const geoScore = getGeoScore(communes, myFreshVisited.communes)
      saveCounts(user.id, {
        communes: myFreshVisited.communes,
        departements: myFreshVisited.departements,
        prefectures: myFreshVisited.prefectures,
        unknowns: myFreshVisited.unknowns,
        count: {
          all: count.all,
          fr: myFreshVisited.visitedCities.length,
          communes: myFreshVisited.communes.length,
          departements: myFreshVisited.departements.length,
          prefectures: myFreshVisited.prefectures.length,
          unknowns: myFreshVisited.unknowns.length,
          pop: geoScore.visitedPop,
          surf: geoScore.visitedSurf,
          alt: geoScore.visitedAltMoyenne
        }
      })
      setVisited(myFreshVisited)
  }

  return (
    <>
      <span id="unknown" className="anchor"></span>
      <div className="bg-white rounded-lg border border-blue-200 text-left text-blue-900 p-2 m-2 sm:p-4 sm:m-4">
        <div className="flex justify-between">
          <h2>{t('places-unknown')}</h2>
        </div>
        <div className="text-sm text-stone-600 my-1">
          {t('places-unknown-desc1')}
        </div>
        <div className="text-sm text-stone-600 my-1">
          {t('places-unknown-desc2')}
        </div>
        <div className="text-sm text-stone-600 my-1">
          {t('places-unknown-desc3')} <Link href={t('places-unknown-desc4-link')} target="_blank">{t('places-unknown-desc4')}</Link>.
        </div>
        <div className="table w-full">
          {visitedUnknown.map((city: City) => {
            const osmUrl = "https://www.openstreetmap.org/search?query=" + city.top_zipcode + " " + city.city;
            var foundCommune = communes.filter((c: Commune) => city.city === c.nom && !c.chefLieu)
            var foundChefLieu = communes.filter((c: Commune) => city.city === c.nom && c.chefLieu)
            if (foundChefLieu.length > 0) {
              foundChefLieu = foundChefLieu.map((c: Commune) => getCommuneFromCode(c.chefLieu, communes))
            }

            var foundPostCode = communes.filter((c: Commune) => c.codesPostaux && c.codesPostaux.includes(city.top_zipcode ? city.top_zipcode : "00000"))

            if (!city.possible) {
              return <div key={city.departement+" "+city.city} className="table-row bg-slate-200 even:bg-indigo-200">
                <div className="table-cell min-w-max pb-4 align-top pt-4">{city.city} ({city.top_zipcode})<br/>
                  <div className="h-3">
                  <a href={osmUrl} className="text-[0.7rem] btn btn-secondary" target="_blank">{t('find-on-osm')}</a>
                  </div>
                </div>
                <div className="sm:table-cell px-6 align-top pt-4 hidden">
                …
                </div>
                <div className="table-cell text-sm">
                  { foundCommune.length > 0 && foundChefLieu.length == 0 &&
                  <span className="text-xs">
                    {city.city} {t('can-have-postcode')} {foundCommune.map((c: Commune)  => c.codesPostaux && c.codesPostaux.map(zip => zip + ", " ) )}
                    <br/></span>}
                    { foundCommune.length == 0 && foundChefLieu.length > 0 &&
                  <span className="text-xs">
                    {city.city} {t('is-in')} {foundChefLieu[0].nom} <br/>
                    {foundChefLieu[0].nom} {t('can-have-postcode')} {foundChefLieu.map((c: Commune)  => c.codesPostaux && c.codesPostaux.map(zip => zip + ", " ) )}
                    <br/></span>}
                    { foundCommune.length > 0 && foundChefLieu.length > 0 &&
                  <span className="text-xs">
                    {city.city} {t('can-have-postcode')} {foundCommune.map((c: Commune)  => c.codesPostaux && c.codesPostaux.map(zip => zip + ", " ) )} or {foundChefLieu.map((c: Commune)  => c.codesPostaux && c.codesPostaux.map(zip => zip + ", " ) )}
                    <br/></span>}
                  { foundPostCode.length > 0 &&
                  <span className="text-xs">
                    {city.top_zipcode} {t('can-have-commune')} {foundPostCode.map((c: Commune)  => c.nom + ", " )}
                    <br/></span>}
                  { foundCommune.length == 0 && foundChefLieu.length == 0 && <span className="text-xs">{city.city} {t('is-not-municipality')} <br/></span>}
                  { foundPostCode.length == 0 && <span className="text-xs">{city.top_zipcode} {t('is-not-postcode')} <br/></span>}

                </div>
                <div className="table-cell align-top text-center">
                {t('check-on-ebt')}<br/>
                <a href={t('ebt-link')} className="text-[0.7rem] btn btn-secondary" target="_blank">Eurobilltracker</a>
                </div>
              </div>
            } else {
            return <form key={city.departement+" "+city.city} onSubmit={handleSubmit} className="table-row even:bg-indigo-50">
                <div className="table-cell min-w-max pb-4 align-top pt-4">{city.city} ({city.top_zipcode})<br/>
                <div className="h-3">
                  <a href={osmUrl} className="text-[0.7rem] btn btn-secondary" target="_blank">{t('find-on-osm')}</a>
                </div>
                <input type="hidden" value={city.city} name="location" id="location" />
                <input type="hidden" value={getDepartement(city.top_zipcode)} name="departement"  id="departement"/>
                <input type="hidden" value="" name="code"  id="code" />
                <input type="hidden" value="" name="commune" id="commune" />
                </div>
                <div className="sm:table-cell px-6 min-w-max whitespace-nowrap align-top pt-4 hidden">
                {t('is-in')}
                </div>
                <div className="table-cell float-left">
                { foundCommune.length > 0 &&
                  <span className="text-xs">
                    {city.city} {t('can-have-postcode')} {foundCommune.map((c: Commune)  => c.codesPostaux && c.codesPostaux.map(zip => zip + ", " ) )}
                    <br/></span>}
                  {dropdownCommunes(city.possible || [])}
                  <br/><span id="error" className="error float-left"></span>

                </div>
                <div className="table-cell">
                  <button className="btn max-w-min mx-auto m-5 p-0 sm:btn-primary sm:px-4 sm:h-[40px] cursor-pointer" id="save" disabled>
                    <span className="sm:hidden">💾</span>
                    <span className="hidden sm:inline-block">{t('save')}</span>
                  </button>
                </div>
            </form>
            }
          })}
        </div>
      </div>
    </>
  )
}

export default UnknownsView;
