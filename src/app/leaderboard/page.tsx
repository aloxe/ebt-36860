import { getUsers } from "@/helpers/dbutils";
import { getPublicUser } from "@/helpers/ebtutils";
import { compareScore, formatDate, getUserFlag, isJson } from "@/helpers/strings";

const List = async () => {

  const barePlayers: DbUser[] = await getUsers()

  var players: DbUser[] = await Promise.all(barePlayers.map(async (p): Promise<DbUser> => {
    p.score = JSON.parse(p.content || "{}").communes.length;
    // TODO keep only parsing when all users are recorded again
    p.username = isJson(p.user) ? JSON.parse(p.user).username : p.user;
    let pu = await getPublicUser(p.user_id)
    p.country = isJson(p.user) ? JSON.parse(p.user).my_country : pu.my_country
    return p;
}));


players.sort( compareScore );

  return (
    <>
      <div className="bg-white rounded-lg border border-blue-200 text-left text-blue-900 sm:p-4 sm:m-4 xs:p-2 xs:m-2">
        <div className="text-right text-stone-600 text-sm">
        <table className="min-w-full text-left text-md font-light">
          <thead className="border-b font-medium dark:border-neutral-500">
            <tr>
              <th colSpan={4} className="p-4 text-center">
                <h2>Leaderboard</h2>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr className="bg-sky-200">
              <th className="px-3 md:px-6 py-4 hidden sm:table-cell text-center">rank</th>
              <th className="px-3 md:px-6 py-2 text-center">name</th>
              <th className="px-3 md:px-6 py-2 text-center">score</th>
              {/* <th className="whitespace-nowrap px-6 py-4">map</th> */}
            </tr>
              {players.map( async (p, index) => (
              <tr className="border-b dark:border-neutral-500 text-stone-800 text-md" key={p.user_id}>
                <td className="whitespace-nowrap px-3 md:px-6 py-4 hidden sm:table-cell">
                    { index + 1 }
                </td>
                <td className="whitespace-nowrap px-3 md:px-6 py-4 text-blue-900">
                  <a href={`/stats/${p.user_id}`} className="border-b dark:border-blue-900">
                    {/* @ts-ignore */}
                    {await getUserFlag(p.country)} {p.username}
                  </a>
                </td>
                <td className="whitespace-nowrap px-3 md:px-6 py-4 md:flex md:justify-between">
                  <div className="text-md">{p.score}</div>
                  <div className="text-right text-xs ">
                    ({formatDate(p.content ? JSON.parse(p.content).date : p.date)})
                  </div>
                </td>
                {/* <td className="whitespace-nowrap px-6 py-4 w-2">carte</td> */}
              </tr>
              ))}
          </tbody>
        </table>
        </div>
      </div>
    </>
  )
}

export default List