import { useTranslation } from '@/i18n'

interface JeuPrefecturesProps {
  lang: string
  user: User
  prefectures: string[]
  cities: City[]
}

async function JeuPrefectures({lang, user, prefectures, cities}: JeuPrefecturesProps) {
  /* eslint-disable react-hooks/rules-of-hooks */
  const { t } = await useTranslation(lang, 'stats')
  const {username } = user;
  const departementsWithDomTom: Departement[] = require('@etalab/decoupage-administratif/data/departements.json')
  const departementsMetro = departementsWithDomTom.filter(el => el.zone === "metro")

  return (
    <>
      <div className="bg-white rounded-lg border border-blue-200 text-left text-black p-2 m-2 sm:p-4 sm:m-4">
        <div className="flex justify-between">
          <h2>
            {t('user-prefectures', {"username": username})}
          </h2>
        </div>
        <div className="text-left text-md mb-4">
          <>
          {departementsMetro.map(departement => {
            if (prefectures.includes(departement.chefLieu)) {
              const pref = cities.find(city => city.code === departement.chefLieu)
              return pref && <div><b key={pref.code}>{departement.code}</b> {pref.commune || pref.city}</div>
            }
          })}
          </>
        </div>
      </div>
    </>
  )
}

export default JeuPrefectures;