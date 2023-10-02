import { fetchAllComplete } from "@/helpers/cityutils";

async function JeuCommunes({user, visited}: {user: publicUser, visited: visited}) {

  const allCommunesWithDomTom = await fetchAllComplete();
  // we remove oversea municipalities
    // @ts-ignore
  const allCommunes = allCommunesWithDomTom.filter(el => el.zone === "metro")

  const firstPourcent = visited.communes.length * 100 / allCommunes.length;

  // @ts-ignore
  const allCommunesPop: number[] = allCommunes.map(el => el.population || 0)
  const allPop = allCommunesPop.reduce((a, b) => a + b)
    // @ts-ignore
  const visitedPop = visited.communes.map(code => allCommunes.find(el => el.code === code).population )
  const visitedPopulation = visitedPop.reduce((a, b) => a + b)
  const secondPourcent = visitedPopulation * 100 / allPop;

    // @ts-ignore
  const allCommunesSurf: number[] = allCommunes.map(el => el.surface)
  const allSurface = allCommunesSurf.reduce((a, b) => a + b) / 100
    // @ts-ignore
  const visitedSurf = visited.communes.map(code => allCommunes.find(el => el.code === code).surface )
  const visitedSurface = (visitedSurf.reduce((a, b) => a + b) /100)
  const thirdPourcent = visitedSurface * 100 / allSurface;


  // const visitedSurf = visited.visitedCities.map(el => el.surface)
  // const visitedSurface = allCommunesSurf.reduce((a, b) => a + b)



  // console.log("visitedPop", visitedPop, visitedPopulation);

// console.log(allCommunesSurf);

  // const allCommunesPop = allCommunes.map(el => el.population)


  return (
    <>
      <div className="bg-white rounded-lg border border-blue-200 text-left text-black-200 p-4 m-5">
        <div className="flex justify-between">
          <h2 className="mb-3 text-lg font-semibold">
            ▤ {user.user_name} score in 36860 ▥
          </h2>
          {/* <div className="text-right text-stone-400 text-sm">
            last updated: {date}
          </div> */}
        </div>
        <div className="text-left text-lg font-bold">
          {visited.communes.length} communes soit {firstPourcent.toFixed(2)}% du nombre de communes<br />
          {Intl.NumberFormat('de').format(visitedPopulation)} habitants soit {secondPourcent.toFixed(2)}% de la population<br />
          {Intl.NumberFormat('de', {maximumFractionDigits: 2,}).format(visitedSurface)} km² soit {thirdPourcent.toFixed(2)}% de la superficie
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