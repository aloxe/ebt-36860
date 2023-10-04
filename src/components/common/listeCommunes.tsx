import { fetchComplete } from "@/helpers/cityutils";
import ListeCommunesDepartement from "./listeCommunesDepartement";

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
              <ListeCommunesDepartement 
                key={departement.code}
                visitedCommunes={visitedCommunes.filter( commune => ( 
                commune?.departement?.code === departement.code))}
                departement={departement} />
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