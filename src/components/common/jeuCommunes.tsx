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

    const inseeAltitude = require('@/data/correspondance-code-insee-altitude-2013.json')

const visitedNumbers = allCommunes.filter(c => visited.communes.includes(c.code) ).map(c => ({
  code: c.code, 
  nom: c.nom, 
  population: c.population,
  surface: c.surface / 100,
  altitude: inseeAltitude.find(el => el.code === c.code).altitude,
}))

const maxPop = visitedNumbers.reduce((prev, current) => {
    return (prev && prev.population > current.population) ? prev : current
})

const minPop = visitedNumbers.reduce((prev, current) => {
    return (prev && prev.population < current.population) ? prev : current
})

const maxSurf = visitedNumbers.reduce((prev, current) => {
    return (prev && prev.surface > current.surface) ? prev : current
})

const minSurf = visitedNumbers.reduce((prev, current) => {
    return (prev && prev.surface < current.surface) ? prev : current
})

const maxAlt = visitedNumbers.reduce((prev, current) => {
    return (prev && prev.altitude > current.altitude) ? prev : current
})

const minAlt = visitedNumbers.reduce((prev, current) => {
    return (prev && prev.altitude < current.altitude) ? prev : current
})

  const visitedAlt = visitedNumbers.filter(c => c.altitude)
  const visitedAltMoyenne = (visitedAlt.reduce((a, b) => a + parseInt(b.altitude), 0)) / visitedAlt.length

  
  // visited.communes.map(code => {
  //   code
  //   allCommunes.find(el => el.code === code).nom,
  //   allCommunes.find(el => el.code === code).population,
  //   allCommunes.find(el => el.code === code).surface
  //   // inseeAltitude.find(el => el.code === code).altitude || undefined
  // })


  
// const max = visited.communes.reduce((prev, current) => {
//     return (prev && prev.population > current.population) ? prev : current
// })

  // const visitedSurf = visited.visitedCities.map(el => el.surface)
  // const visitedSurface = allCommunesSurf.reduce((a, b) => a + b)



  // console.log("visitedPop", visitedPop, visitedPopulation);

// console.log(allCommunesSurf);

  // const allCommunesPop = allCommunes.map(el => el.population)


  return (
    <>
      <div className="bg-white rounded-lg border border-blue-200 text-left text-black p-4 m-5">
        <div className="flex justify-between">
          <h2 className="mb-3 text-lg font-semibold">
            ▤ {user.user_name} score in 36860 ▥
          </h2>
          {/* <div className="text-right text-stone-400 text-sm">
            last updated: {date}
          </div> */}
        </div>
        <div className="text-left text-lg font-bold mb-4">
          <span className="text-blue-600">{visited.communes.length}</span> communes soit <span className="text-blue-600">{firstPourcent.toFixed(2)}%</span> du nombre de communes<br />
          <span className="text-red-600">{Intl.NumberFormat('de').format(visitedPopulation)}</span> habitants soit <span className="text-red-600">{secondPourcent.toFixed(2)}%</span> de la population<br />
          <span className="text-green-500">{Intl.NumberFormat('de', {maximumFractionDigits: 2, minimumFractionDigits: 2}).format(visitedSurface)}</span> km² soit <span className="text-green-500">{thirdPourcent.toFixed(2)}%</span> de la superficie
        </div>
        <div className="text-left mb-4">
          la plus peuplée : {maxPop.nom} avec {Intl.NumberFormat('de').format(maxPop.population)} habitants<br/>
          la moins peuplée : {minPop.nom} avec {Intl.NumberFormat('de').format(minPop.population)} habitants
        </div>
        <div className="text-left mb-4">
          la plus étendue : {maxSurf.nom} avec {Intl.NumberFormat('de', {maximumFractionDigits: 2,}).format(maxPop.surface)} km²<br/>
          la moins étendue : {minSurf.nom} avec {Intl.NumberFormat('de', {maximumFractionDigits: 2,}).format(minPop.surface)} km²
        </div>
        <div className="text-left mb-2">
          la plus élevée : {maxAlt.nom} avec {Intl.NumberFormat('de').format(maxAlt.altitude)} m<br/>
          la moins élevée : {minAlt.nom} avec {Intl.NumberFormat('de').format(minAlt.altitude)} m<br/>
          altitude moyenne : {visitedAltMoyenne.toFixed(2)} m
        </div>
      </div>
    </>
  )
}

export default JeuCommunes;