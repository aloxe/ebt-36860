import JeuCommunes from "@/components/common/jeuCommunes";
import Summary from "@/components/common/summary";
import { getUserVisited } from "@/helpers/dbutils";
import { getPublicUser } from "@/helpers/ebtutils";

const UserData = async ({ params }: { params: { id: string } }) => {
  console.log("c parti " + params.id);

  const publicUser = await getPublicUser(params.id);
  const visited = await getUserVisited(params.id);


// var visitedCommunes: commune[] = await Promise.all(visited.communes.map(async (code: string): Promise<commune> => {
//     let visitedCommune = await fetchComplete(code);
//     return visitedCommune;
// }));
 
// visitedCommunes.sort( (a, b) => {
//     if (a.codesPostaux[0] < b.codesPostaux[0]) {
//         return -1;
//     }
//     if (a.codesPostaux[0] > b.codesPostaux[0]) {
//         return 1;
//     }
//     return 0;
// });


          // const departements = require('@etalab/decoupage-administratif/data/departements.json')
          // console.log(departements);

    return (
      <>
      <Summary user={publicUser} visited={visited}/>
      <div className="relative flex place-items-center before:absolute before:h-[300px] before:w-[480px] before:-translate-x-1/2 before:rounded-full before:bg-gradient-radial before:from-white before:to-transparent before:blur-2xl before:content-[''] after:absolute after:-z-20 after:h-[180px] after:w-[240px] after:translate-x-1/3 after:bg-gradient-conic after:from-sky-200 after:via-blue-200 after:blur-2xl after:content-[''] before:dark:bg-gradient-to-br before:dark:from-transparent before:dark:to-blue-700 before:dark:opacity-10 after:dark:from-sky-900 after:dark:via-[#0141ff] after:dark:opacity-40 before:lg:h-[360px] z-[-1]">
        <menu>
          36860 score ⋅
          commune list ⋅
          map ⋅
          tour de France ⋅
          jeu des préfectures
        </menu>
      </div>
      <JeuCommunes user={publicUser} visited={visited}/>
      </>
    )
}
//   return (
//   <>
//     <div className="relative flex place-items-center before:absolute before:h-[300px] before:w-[480px] before:-translate-x-1/2 before:rounded-full before:bg-gradient-radial before:from-white before:to-transparent before:blur-2xl before:content-[''] after:absolute after:-z-20 after:h-[180px] after:w-[240px] after:translate-x-1/3 after:bg-gradient-conic after:from-sky-200 after:via-blue-200 after:blur-2xl after:content-[''] before:dark:bg-gradient-to-br before:dark:from-transparent before:dark:to-blue-700 before:dark:opacity-10 after:dark:from-sky-900 after:dark:via-[#0141ff] after:dark:opacity-40 before:lg:h-[360px] z-[-1]">
//     <h1>
//       {visited?.username}
//     </h1>
//      <div className="bg-white rounded-lg border border-blue-200 text-left text-blue-900 p-4 m-5">


//         <table className="min-w-full text-left text-sm font-light">
//           <thead className="border-b font-medium dark:border-neutral-500">
//             <tr>
//               <th colSpan={3} className="whitespace-nowrap px-6 py-4">user title</th>
//             </tr>
//           </thead>
//           <tbody>
//             {departements.map((departement: any)  => (
//               <>
//               <tr key={departement.code}>
//                   <th colSpan={3} className="whitespace-nowrap px-6 py-4">{departement.nom} ({departement.code})</th>
//                   <th colSpan={1} className="whitespace-nowrap px-6 py-4">{visitedCommunes.filter(function(commune: commune){
//                   return commune.departement.code === departement.code }).length}</th>
//               </tr>
//               {visitedCommunes.map( commune => ( 
//                 commune.departement.code === departement.code &&
//                 <tr className="border-b dark:border-neutral-500" key={commune.code}>
//                   <td className="whitespace-nowrap px-6 py-4">
//                     {commune.codesPostaux[0]}
//                   {!!commune.codesPostaux[1] && "…"}
//                   </td>
//                   <td className="whitespace-nowrap px-6 py-4">{commune.nom}</td>
//                   <td className="whitespace-nowrap px-6 py-4">
//                     {(commune.surface/100).toFixed(2)} km²<br />
//                     {commune.population} hab.
//                   </td>
//                 </tr>
//               ))}
//               </>
//           ))}
//           </tbody>
//         </table>
//     </div>

//     <div className="bg-white rounded-lg border border-blue-200 text-left text-blue-900 p-4 m-5">
//       {/* {allCommuneNames.map((name, index) => <span key={index}>{name}</span>)} */}
//       {/* {visited?.communes.map((code, index) => <span key={index}>{getName(code) || <b>→ {code} ←</b>} </span>)} */}
//     </div>
//     </div>
//   </>
//   )
// }

export default UserData