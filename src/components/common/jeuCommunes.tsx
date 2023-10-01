
async function  JeuCommunes({user, visited}: {user: publicUser, visited: visited}) {

  // const allCommunes = await fetchAllComplete();
  const allCommunes = require('@etalab/decoupage-administratif/data/communes.json')

console.log(allCommunes);

  const firstPourcent = visited.communes.length * 100 / allCommunes.length;
  // const allCommunesSurf = allCommunes.map(el => el.surface)
  // const allSurface = allCommunesSurf.reduce((a, b) => a + b)
  // const allCommunesPop = allCommunes.map(el => el.population)


  return (
    <>
      <div className="bg-white rounded-lg border border-blue-200 text-left text-blue-900 p-4 m-5">
        <div className="flex justify-between">
          <h2 className="mb-3 text-lg font-semibold">
            ▤ {user.user_name} 36860 score ▥
          </h2>
          {/* <div className="text-right text-stone-400 text-sm">
            last updated: {date}
          </div> */}
        </div>
        <div className="text-left text-lg font-bold">
          {visited.communes.length} communes soit {firstPourcent}% du nombre de communes
          11 783 837 habitants soit 17.66% de la population
          13 570,65 km² soit 2.49% de la superficie
        </div>
        <div className="text-left">
          la plus peuplée : Paris avec 2 204 773 habitants
          la moins peuplée : Le Mont-Saint-Michel avec 30 habitants
        </div>
        <div className="text-left">
          la plus étendue : Les Belleville avec 226.84 km²
          la moins étendue : Le Catelet avec 0.41 km²
        </div>
        <div className="text-left">
          la plus élevée : Courchevel avec 2026.00m
          la moins élevée : Île-Tudy avec 1.00m
          altitude moyenne : 176.46m
        </div>
      </div>
    </>
  )
}

export default JeuCommunes;