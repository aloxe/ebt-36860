import { fetchAllComplete } from "@/helpers/cityutils";

async function ListeCommunes({user, visited}: DetailsProps) {

  const departements: Departement[] = require('@etalab/decoupage-administratif/data/departements.json')
  const allcommunes: Commune[] = await fetchAllComplete();
  const visitedCommunes: Commune[] = allcommunes.filter(c => visited.communes.includes(c.code))
  const visitedPrefectures: string[] = visited.prefectures;

  console.log("ListeCommunes");
  
  return (
    <>
      <div className="bg-white rounded-lg border border-blue-200 text-left text-black sm:p-4 sm:m-4 xs:p-2 xs:m-2">
        <table className="w-full text-left text-md font-light">
          <thead className="border-b font-medium dark:border-neutral-500">
            <tr>
              <th colSpan={3} className="whitespace-nowrap p-4 text-center">{user.username} list of communes</th>
            </tr>
          </thead>
          <tbody>
            {departements.map((departement: any)  => (
              <>
              <tr key={departement.code} className={visitedCommunes.filter(function(commune){
                  return commune?.departement?.code === departement.code }).length < 1 ? "bg-sky-100 opacity-20" : "bg-sky-200"}>
                  <th colSpan={3} className="whitespace-nowrap p-4">
                    {departement.code === "984" ? <>TAAF (984)</> :
                    <>{departement.nom} ({departement.code})</>}
                    <div className="float-right">
                      {visitedCommunes.filter(function(commune){
                      return commune?.departement?.code === departement.code }).length} {visitedPrefectures.length && visitedPrefectures.includes(departement.chefLieu) ? "🏛️" : ""}
                    </div>
                    </th>
              </tr>
              {visitedCommunes.map( commune => (
                commune?.departement?.code === departement.code &&
                <tr className="border-b dark:border-neutral-500" key={commune.code}>
                  <td className="whitespace-normal break-words p-2 md:p-4">
                    <div className="text-xs font-bold md:text-lg md:font-thin">
                      {commune?.codesPostaux[0]}
                      {!!commune?.codesPostaux[1] && "…"}
                    </div>
                    <div className="md:hidden text-md md:text-lg ">{commune.nom}</div>
                    </td>
                  <td className="md:p-4">
                    <div className="hidden md:block">{commune.nom}</div>
                    </td>
                  <td className="whitespace-nowrap p-2 md:p-4 text-right">
                    {commune?.surface && <>{Intl.NumberFormat('fr', {maximumFractionDigits: 2}).format((commune?.surface / 100 || 0))} km²<br /></>}
                    {commune?.population && <>{Intl.NumberFormat('fr').format(commune?.population)} hab.</>}
                    {typeof(commune?.population) !== "number" && <>UNDEF</>}
                  </td>
                </tr>
              ))}
              </>
            ))}
          </tbody>
        </table>
    </div>
    {/* essai liste brute */}
    {/* <div className="bg-white rounded-lg border border-blue-200 text-left text-blue-900 p-4 m-5">
      {allCommuneNames.map((name, index) => <span key={index}>{name}</span>)}
      {visited?.communes.map((code, index) => <span key={index}>{getName(code) || <b>→ {code} ←</b>} </span>)}
    </div> */}
  </>
  )
}

export default ListeCommunes;