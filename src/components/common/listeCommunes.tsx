import { fetchComplete } from "@/helpers/cityutils";

async function ListeCommunes({user, visited}: {user: publicUser, visited: visited}) {

  const departements = require('@etalab/decoupage-administratif/data/departements.json')
  // const { communes: visitedCommunes } = visited
  // const allCommunes = await fetchAllComplete();

  const visitedCommunes: commune[] = await Promise.all(visited.communes.map(async (code: string): Promise<commune> => {
    let visitedCommune = await fetchComplete(code);
    return visitedCommune;
}));

  return (
    <>
      <div className="bg-white rounded-lg border border-blue-200 text-left text-black p-4 m-5">
        <table className="min-w-full text-left text-md font-light">
          <thead className="border-b font-medium dark:border-neutral-500">
            <tr>
              <th colSpan={3} className="whitespace-nowrap px-6 py-4 text-center">{user.user_name} list of communes</th>
            </tr>
          </thead>
          <tbody>
            {departements.map((departement: any)  => (
              <>
              <tr key={departement.code} className={visitedCommunes.filter(function(commune: commune){
                  return commune?.departement?.code === departement.code }).length < 1 ? "bg-sky-100 opacity-20" : "bg-sky-200"}>
                  <th colSpan={3} className="whitespace-nowrap px-6 py-4">{departement.nom} ({departement.code})</th>
                  <th colSpan={1} className="whitespace-nowrap px-6 py-4">{visitedCommunes.filter(function(commune: commune){
                  return commune?.departement?.code === departement.code }).length}</th>
              </tr>
              {visitedCommunes.map( commune => ( 
                commune?.departement?.code === departement.code &&
                <tr className="border-b dark:border-neutral-500" key={commune.code}>
                  <td className="whitespace-nowrap px-6 py-4">
                    {commune?.codesPostaux[0]}
                  {!!commune?.codesPostaux[1] && "…"}
                  </td>
                  <td className="whitespace-nowrap px-6 py-4">{commune.nom}</td>
                  <td className="whitespace-nowrap px-6 py-4">
                    {(commune?.surface || 0 / 100).toFixed(2)} km²<br />
                    {commune?.population} hab.
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