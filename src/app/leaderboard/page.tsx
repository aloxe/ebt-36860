import { getUsers } from "@/helpers/dbutils";
import { compareScore, formatDate, getUserFlag, isJson } from "@/helpers/strings";

const List = async () => {

  const players: dbUser[] = await getUsers()

  players.map( async p => {
    p.score = JSON.parse(p.content || "{}").communes.length;
    // TODO keep only parsing when all users are recorded again
    p.username = isJson(p.user) ? JSON.parse(p.user).username : p.user;
  })

  players.sort( compareScore );

  return (
    <>
      <div className="bg-white rounded-lg border border-blue-200 text-left text-blue-900 p-4 m-5">
        <div className="text-right text-stone-500 text-sm">
        <table className="min-w-full text-left text-md font-light">
          <thead className="border-b font-medium dark:border-neutral-500">
            <tr>
              <th colSpan={4} className="whitespace-nowrap px-6 py-4 text-center">Leaderboard</th>
            </tr>
          </thead>
          <tbody>
            <tr className="bg-sky-200">
              <th className="whitespace-nowrap px-6 py-4  hidden sm:table-cell">rank</th>
              <th className="whitespace-nowrap px-6 py-4">name</th>
              <th className="whitespace-nowrap px-6 py-4">score</th>
              {/* <th className="whitespace-nowrap px-6 py-4">map</th> */}
            </tr>
              {players.map( async (p, index) => (
              <tr className="border-b dark:border-neutral-500 text-stone-800 text-md" key={p.user_id}>
                <td className="whitespace-nowrap px-6 py-4 hidden sm:table-cell">
                    { index + 1 }
                </td>
                <td className="whitespace-nowrap px-6 py-4 text-blue-900">
                  <a href={`/stats/${p.user_id}`} className="border-b dark:border-blue-900">
                    {/* @ts-ignore */}
                    {await getUserFlag(p.user_id)} {p.username}
                  </a>
                </td>
                <td className="whitespace-nowrap px-6 py-4 md:flex md:justify-between">
                  <div className="text-md">{p.score}</div>
                  <div className="text-right text-xs ">
                    ({formatDate(p.content ? JSON.parse(p.content).date : p.date)})
                  </div>
                </td>
                {/* <td className="whitespace-nowrap px-6 py-4 w-2"></td> */}
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