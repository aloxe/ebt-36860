import JeuCommunes from "@/components/common/jeuCommunes";
import { getUserVisited } from "@/helpers/dbutils";
import { getPublicUser } from "@/helpers/ebtutils";

const UserData = async ({ params }: { params: { id: string } }) => {
  console.log("c parti " + params.id);
  console.log("public user");
  
  const publicUser = await getPublicUser(params.id);
console.log("getUserVisited");

  const visited = await getUserVisited(params.id);
console.log("visited done" + visited.date);

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




    return (
      <>
      {/* <Summary user={publicUser} visited={visited}/>
      <div className="relative flex place-items-center before:absolute before:h-[300px] before:w-[480px] before:-translate-x-1/2 before:rounded-full before:bg-gradient-radial before:from-white before:to-transparent before:blur-2xl before:content-[''] after:absolute after:-z-20 after:h-[180px] after:w-[240px] after:translate-x-1/3 after:bg-gradient-conic after:from-sky-200 after:via-blue-200 after:blur-2xl after:content-[''] before:dark:bg-gradient-to-br before:dark:from-transparent before:dark:to-blue-700 before:dark:opacity-10 after:dark:from-sky-900 after:dark:via-[#0141ff] after:dark:opacity-40 before:lg:h-[360px] z-[-1]">
        <menu>
          36860 score ⋅
          commune list ⋅
          map ⋅
          tour de France ⋅
          jeu des préfectures
        </menu>
      </div> */}
      {/* <ListeCommunes user={publicUser} visited={visited}/> */}
      <JeuCommunes user={publicUser} visited={visited}/>
      </>
    )
}

export default UserData