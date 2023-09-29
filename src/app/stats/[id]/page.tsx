  import { fetchComplete } from "@/helpers/cityutils";
import { getUserVisited } from "@/helpers/dbutils";

interface commune {
    "code": string;
    "nom": string;
    "surface": number;
    "population": number;
    "codesPostaux": string[];
    "centre": { type: 'Point', coordinates: Array },
    "contour": { type: 'Polygon', coordinates: Array },
    "zone": 'metro',
    "departement": { code: string, nom: string; },
    "region": { code: string, nom: string; }
  }

  const UserData = async ({ params }: { params: { id: string } }) => {
  console.log("c parti");
  console.log(params.id);

  const visited = await getUserVisited(params.id);

var visitedCommunes: commune[] = await Promise.all(visited.communes.map(async (code: string): Promise<commune> => {
    let visitedCommune = await fetchComplete(code);
    return visitedCommune;
}));
 
visitedCommunes.sort( (a, b) => {
    if (a.codesPostaux[0] < b.codesPostaux[0]) {
        return -1;
    }
    if (a.codesPostaux[0] > b.codesPostaux[0]) {
        return 1;
    }
    return 0;
});


// console.log(visitedCommunes, "…..…..……..…..……..…..……..…..……..…..……..…..……..…..……..…..……..…..……..…..……..…..……..…..…");


// visited.communes.map( async (code: string) => {
//   console.log(code, "←--");
//   const plop = await fetchComplete(code);
//   console.log(plop.nom);
  
//   console.log("… . . … . … . . …");
  
  
// });


//   const allCommunes = await fetchAllCommunes();
// const AllEtalabCommunes = require('@etalab/decoupage-administratif/data/communes.json')
// const skimEtalab = () => {
//   // const communes = AllEtalabCommunes.filter( item => item.type !== "commune-deleguee")
//   const communes = AllEtalabCommunes.filter( item => item.type === "commune-actuelle")
//   // console.log(communes);
//   return communes;
// }
// const AllEtalabCommunesFilltered = skimEtalab()
//     console.log("allAPICommunes ←←←←←←←←←←←←←←← length " + allCommunes.length);
//     console.log("AllEtalabCommunes <=<=<=<=<=<=<= length " + AllEtalabCommunes.length);
//     // console.log("AllEtalabCommunes ←←←←←←←←←←←←←←← " + AllEtalabCommunesFilltered.length);


// const getName = (code:string) => {
//   const commune = allCommunes.find( item => item.code === code)
//   // console.log(communes);
//   return commune?.nom;
// }



// const getObject = (code:string) => {
//   const communes = allCommunes.filter( item => item.code === code)
//   // console.log(communes);
//   return communes || "→ "+code+" ←";
// }

// const communeBizarre = getObject("22264")
// console.log("cheflieu de communeBizarre", communeBizarre);


// console.log(visitedCommunes);

// const communeBizare = getObject("22264")
// console.log("communeBizare", communeBizare);


// console.log(allCommunes);



//   const fetchCommuneNames = async () => {
//     console.log("fetchCommuneNames ←←←←←←←←←←←←←←← " + visited?.communes.length);
    
//     const communesNames: string[] = []
//     await visited?.communes.map(async (code: string) => {
//       const commune = await fetchCommuneName(code);
//       console.log(commune?.nom);

//       communesNames.push(commune?.nom||"NONE-"+code)
//     })
//     console.log(communesNames);
    
//     return communesNames;
//   }

//   const fetchCommuneName = async (code:string) => {
//   const response = await fetch(
//       `https://geo.api.gouv.fr/communes?code=${code}&fields=code,nom`
//     )
//   const results = await response.json()
//   return results[0];
// }

// const allCommuneNames = await fetchCommuneNames();




    // const EBTLocations = await getEBTlocation();
    // console.log("EBTLocations is now ", EBTLocations);

      // const allVisited = await getAllVisited();

      // console.log("allVisited", allVisited);
      
          const departements = require('@etalab/decoupage-administratif/data/departements.json')
          console.log(departements);
          
  return (
  <>
    <div className="relative flex place-items-center before:absolute before:h-[300px] before:w-[480px] before:-translate-x-1/2 before:rounded-full before:bg-gradient-radial before:from-white before:to-transparent before:blur-2xl before:content-[''] after:absolute after:-z-20 after:h-[180px] after:w-[240px] after:translate-x-1/3 after:bg-gradient-conic after:from-sky-200 after:via-blue-200 after:blur-2xl after:content-[''] before:dark:bg-gradient-to-br before:dark:from-transparent before:dark:to-blue-700 before:dark:opacity-10 after:dark:from-sky-900 after:dark:via-[#0141ff] after:dark:opacity-40 before:lg:h-[360px] z-[-1]">
    <h1>
      {visited?.username}
    </h1>
     <div className="bg-white rounded-lg border border-blue-200 text-left text-blue-900 p-4 m-5">


        <table className="min-w-full text-left text-sm font-light">
          <thead className="border-b font-medium dark:border-neutral-500">
            <tr>
              <th colSpan={3} className="whitespace-nowrap px-6 py-4">user title</th>
            </tr>
          </thead>
          <tbody>
            {departements.map((departement: any)  => (
              <>
              <tr key={departement.code}>
                  <th colSpan={3} className="whitespace-nowrap px-6 py-4">{departement.nom} ({departement.code})</th>
                  <th colSpan={1} className="whitespace-nowrap px-6 py-4">{visitedCommunes.filter(function(commune: commune){
                  return commune.departement.code === departement.code }).length}</th>
              </tr>
              {visitedCommunes.map( commune => ( 
                commune.departement.code === departement.code &&
                <tr className="border-b dark:border-neutral-500" key={commune.code}>
                  <td className="whitespace-nowrap px-6 py-4">
                    {commune.codesPostaux[0]}
                  {!!commune.codesPostaux[1] && "…"}
                  </td>
                  <td className="whitespace-nowrap px-6 py-4">{commune.nom}</td>
                  <td className="whitespace-nowrap px-6 py-4">
                    {(commune.surface/100).toFixed(2)} km²<br />
                    {commune.population} hab.
                  </td>
                </tr>
              ))}
              </>
          ))}
          </tbody>
        </table>
    </div>

    <div className="bg-white rounded-lg border border-blue-200 text-left text-blue-900 p-4 m-5">
      {/* {allCommuneNames.map((name, index) => <span key={index}>{name}</span>)} */}
      {/* {visited?.communes.map((code, index) => <span key={index}>{getName(code) || <b>→ {code} ←</b>} </span>)} */}
    </div>
    </div>
  </>
  )
}

export default UserData