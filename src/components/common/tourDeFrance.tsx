import CarteDeFranceSvg from "@/assets/france-departements.svg";
import './tourDeFrance.css';
import PostToForum from "@/components/common/postToForum";

interface TourDeFranceProps {
  lang: string;
  user: User;
  departements: string[];
  heading: string;
  isDashboard?: boolean;
}

function TourDeFrance({lang, user, departements, heading, isDashboard}: TourDeFranceProps) {

  const visitedDepartements: string[] = departements;
  const regionsWithDomTom: Region[] = require('@etalab/decoupage-administratif/data/regions.json')
  const departementsWithDomTom: Departement[] = require('@etalab/decoupage-administratif/data/departements.json')
  const regionsMetro = regionsWithDomTom.filter(el => el.zone === "metro")
  const departementsMetro = departementsWithDomTom.filter(el => el.zone === "metro")

  let visitedRegions: {name: string, deps: {code: string, visited: boolean}[]}[] = []
  regionsMetro.map(region => {
    let deps: {code: string, visited: boolean}[] = []
    departementsMetro.map(departement => {
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

  // TODO add flag
  const BBCode = `[size=150]MÀJ de ${user.username}[/size]\n` + 
  visitedRegions.map(region => {
    const visitedLength = region.deps.filter(d => d.visited).length
    const win = visitedLength === region.deps.length ? " 🏆 " : ""
    return (
      " \n" +
      (visitedLength === 0 ? "[color='lightslategray']" : (!!win ? "[color='navy'][b]" : "[color='blue']")) +
      region.name + win + 
      (!!win ? "[/b][/color]" : "[/color]") + " " +
      visitedLength+"/"+region.deps.length +
      region.deps.map(dep => (
        (dep.visited ? "[color='navy'][b] " : "[color='lightslategray'] ") +
        dep.code +
        (dep.visited ? "[/b][/color]" : "[/color]")
      )).join(' ')
    )
  }).join('') + 
`

[size=85]calculé sur [url=https://ebt.fr.eu.org/]▤ 36680 ▥[/url] avec les communes métropolitaines uniquement[/size]`;

  return (
    <>
      <div className="bg-white rounded-lg border border-blue-200 text-left text-black p-2 m-2 sm:p-4 sm:m-4">
        <div className="flex justify-between">
          <h2>
            {heading}
          </h2>
        </div>
        <div className="text-left text-md mb-4">
          <>
          {visitedRegions.map(region => {
            return <div key={region.name}>
              <span className={`block font-thin text-lg mt-2 ${region.deps.filter(d => d.visited).length === 0 ? "opacity-30" : region.deps.filter(d => d.visited).length === region.deps.length ? "opacity-100" : "opacity-60"}`}>{region.name} {region.deps.filter(d => d.visited).length === region.deps.length && <>🏆</>} ({region.deps.filter(d => d.visited).length}/{region.deps.length}) :
              </span>
                {region.deps.map(dep => {
                  return <span key={dep.code} className={dep.visited ? "font-semibold text-blue-800" : "opacity-30"}> {dep.code}</span>
                })}
            </div>
          })}
          </>
        </div>
        {!isDashboard && <></>}
        {isDashboard && <>
          {/* /!\ bellow is a client component */}
          <PostToForum lang={lang} message={BBCode} topic={"6255"} />
        </>}
        <div className="text-left text-md mb-4">
          <CarteDeFranceSvg visited={visitedDepartements} />
        </div>
      </div>
    </>
  )
}

export default TourDeFrance;