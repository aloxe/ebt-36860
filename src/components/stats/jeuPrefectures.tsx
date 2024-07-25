import { removeNotPrefecture } from "@/helpers/cityutils";

function JeuPrefectures({user, visited}: DetailsProps) {
  const prefectures = removeNotPrefecture(visited.communes);
  const departementsWithDomTom: Departement[] = require('@etalab/decoupage-administratif/data/departements.json')
  const departements = departementsWithDomTom.filter(el => el.zone === "metro")

  return (
    <>
      <div className="bg-white rounded-lg border border-blue-200 text-left text-black p-2 m-2 sm:p-4 sm:m-4">
        <div className="flex justify-between">
          <h2>
            Les préfectures de {user.username}
          </h2>
        </div>
        <div className="text-left text-md mb-4">
          <>
          {departements.map(departement => {
            if (prefectures.includes(departement.chefLieu)) {
                const pref = visited.visitedCities.find(city => city.code === departement.chefLieu)
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
