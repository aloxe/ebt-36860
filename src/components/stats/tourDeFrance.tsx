import CarteDeFranceSvg from "@/assets/france-departements.svg";
import { removeDuplicateDepartements } from "@/helpers/cityutils";
import './tourDeFrance.css';

function TourDeFrance({user, visited}: DetailsProps) {

  const regionsWithDomTom: Region[] = require('@etalab/decoupage-administratif/data/regions.json')
  const departementsWithDomTom: Departement[] = require('@etalab/decoupage-administratif/data/departements.json')
  const regions = regionsWithDomTom.filter(el => el.zone === "metro")
  const departements = departementsWithDomTom.filter(el => el.zone === "metro")

  let visitedDepartementCities: City[] = removeDuplicateDepartements(visited.visitedCities);
  const visitedDepartements: string[] = visitedDepartementCities.map(city => city.departement);

  let visitedRegions: {name: string, deps: {code: string, visited: boolean}[]}[] = []
  regions.map(region => {
    let deps: {code: string, visited: boolean}[] = []
    departements.map(departement => {
      if (departement.region === region.code) {
        deps.push({
          code: departement.code,
          visited: visitedDepartements.includes(departement.code)
        })
      }
    })
    visitedRegions.push({
      name: region.nom,
      deps
    })
  })

  return (
    <>
      <div className="bg-white rounded-lg border border-blue-200 text-left text-black sm:p-4 sm:m-4 xs:p-2 xs:m-2">
        <div className="flex justify-between">
          <h2 className="mb-3 text-lg font-semibold text-center">
            Tour de France de {user.username}
          </h2>
        </div>
        <div className="text-left text-md mb-4">
          <>
          {visitedRegions.map(region => {
            return <div key={region.name}><b 
              className={region.deps.filter(d => d.visited).length === region.deps.length ? "font-semibold text-blue-800" : region.deps.filter(d => d.visited).length === 0 ? "opacity-30" : "opacity-60"}>
                {region.name}</b> ({region.deps.filter(d => d.visited).length}/{region.deps.length})<b>:</b>
                {region.deps.map(dep => {
                  return <span key={dep.code} className={dep.visited ? "font-semibold text-blue-800" : "opacity-30"}> {dep.code}</span>
                })}
            </div>
          })}
          </>
        </div>
        <div className="text-left text-md mb-4">
          <CarteDeFranceSvg visited={visitedDepartements} />
          {/* <CarteSvg {...france} checkedLayers={visitedDepartements} layerProps={layerProps} /> */}
        </div>
      </div>
    </>
  )
}

export default TourDeFrance;