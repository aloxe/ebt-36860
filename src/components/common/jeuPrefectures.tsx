import { removeNotPrefecture } from "@/helpers/cityutils";

function JeuPrefectures({user, visited}: {user: publicUser, visited: visited}) {
  const prefectures = removeNotPrefecture(visited.communes);
  const departementsWithDomTom: departement[] = require('@etalab/decoupage-administratif/data/departements.json')
  const departements = departementsWithDomTom.filter(el => el.zone === "metro")

  return (
    <>
      <div className="bg-white rounded-lg border border-blue-200 text-left text-black p-4 m-5">
        <div className="flex justify-between">
          <h2 className="mb-3 text-lg font-semibold text-center">
            Les préfectures de {user.user_name}
          </h2>
        </div>
        <div className="text-left text-md mb-4">
          <>
          {departements.map(departement => {
            if (prefectures.includes(departement.chefLieu)) {
                const pref = visited.visitedCities.find(city => city.code === departement.chefLieu)
                return pref && <div><b key={pref.code}>{departement.code}</b> {pref.city}</div>
            }
          })}
          </>
        </div>
      </div>
    </>
  )
}

export default JeuPrefectures;