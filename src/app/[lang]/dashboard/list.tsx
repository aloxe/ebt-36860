'use client'
import { useTranslation } from '@/i18n/client'

const ListLocations = ({ lang, user, visited }: {lang: string, user: User, visited: Visited }) => {
  /* eslint-disable react-hooks/rules-of-hooks */
  const { t } = useTranslation(lang, 'dashboard')
  const departements: Departement[] = require('@etalab/decoupage-administratif/data/departements.json')
  const communes: Commune[] = require('@etalab/decoupage-administratif/data/communes.json')

  const visitedCommunes: Commune[] = communes.filter(c => visited.communes.includes(c.code) && c?.rangChefLieu === 0)
  
  
  return (
    <>
      <div className="bg-white rounded-lg border border-blue-200 text-left text-black p-2 m-2 sm:p-4 sm:m-4">
        <table className="w-full text-left text-md font-light">
          <thead className="border-b font-medium dark:border-neutral-500">
            <tr>
              <th colSpan={3}>
                <h2>
                  {t('list-locations')}
                </h2>
              </th>
            </tr>
          </thead>
          {departements.map((departement: any) => (
            <tbody key={departement.code}>
              <tr className={visitedCommunes.filter(function(commune) {
                return commune?.departement === departement.code }).length < 1 ? "bg-sky-100 opacity-20" : "bg-sky-200"}>
                <th className="whitespace-nowrap p-4">
                  {departement.code === "984" ? <>TAAF (984)</> :
                  <>{departement.nom} ({departement.code})</>}
                  <div className="float-right font-thin">
                    {visitedCommunes.filter((commune) => (commune?.departement === departement.code)).length} {t('municipality', {count: visitedCommunes.filter((commune) => (commune?.departement === departement.code)).length})} 
                  </div>
                </th>
              </tr>
              {visitedCommunes.map( commune => (
                commune?.departement === departement.code &&
                <tr className="border-b dark:border-neutral-500" key={commune.code}>
                  <td className="whitespace-normal break-words p-2 md:p-4">
                    <div className="text-xs font-bold md:text-lg md:font-thin">
                      INSEE {commune.code}<br/>
                    </div>
                    <div className="text-lg"><b>{commune.nom}</b>
                      <div className="float-right">
                        <a href={`https://fr.eurobilltracker.com/?find=${commune.nom}&s1.x=5&s1.y=6`} className="text-[0.6rem] btn btn-secondary" target="_blank">{t('find-on-ebt')}</a>
                      </div>
                    </div>
                    <div className="text-sm">{visited.visitedCities.map(city => {
                      if (city.code === commune.code) {
                        const textColor = city.city === commune.nom ? "text-neutral-700" : " text-red-800"
                        if (city?.postcodes) {
                          return city.postcodes.map(cp => (<span key={cp} className={textColor}>{city.city} ({cp})· </span>))
                        } else {
                          return <span key={city.city} className={textColor}>{city.city} · </span>
                        }
                      } else {
                        return null;
                      }
                    })
                    }</div>
                  </td>
                </tr>
              ))}
            </tbody>
          ))}
        </table>
    </div>
  </>
  )
}

export default ListLocations