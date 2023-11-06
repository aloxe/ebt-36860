'use client'
import Spinner from "@/components/common/spinner";
import { formatDate } from "@/helpers/strings";
import Link from "next/link";

const  AdminPage = ({ players }: {players: DbUser[]}) => {
  return (
    <>
    <table className="min-w-full text-left text-md font-light">
      <thead className="border-b font-medium dark:border-neutral-500">
        <tr className="bg-sky-200">
          <th className="px-3 md:px-6 py-4 text-center">1</th>
          <th className="px-3 md:px-6 py-2 text-center">2</th>
          <th className="px-3 md:px-6 py-2 text-center">3</th>
        </tr>
      </thead>
      <tbody>
        {!players &&
        <tr><td><Spinner /></td></tr>
        }
        {players && players.map((p, index) => (
        <tr className="h-1 bg-slate-100 border-b dark:border-neutral-500 text-md hover:bg-amber-50"
        key={p.user_id}>
          <td>
          {p.user_id}<br />
          <>{p.flag} {p.username}</><br/>
          <div className="text-center font-thin text-sm">{formatDate(p.date)}</div>
          </td>
          <td>

            {!p.visited?.communes && <>
              communes non récupérées
            </>}
            {p.visited?.communes && <>
              Locations: {p.visited?.visitedCities?.length}<br/>
              communes: {p.visited?.communes?.length}<br/>
              Dpt: {p.visited?.departements?.length}<br/>
            </>}
          </td>
          <td>
          {!!p.visited?.unknown && 
          <>
            <Link href={{ pathname: 'unknowns', query: { user_id: JSON.stringify(p.user_id) } }}>unknown: {p.visited?.unknown?.toString()}</Link>
            <br/>
          </>}
          {!p.visited?.unknown && <>All known<br/></>}
          <Link href={{ pathname: 'usermap', query: { user_id: JSON.stringify(p.user_id) } }}>Carte: {p.polygons === "{}" ? "☐" : "☑"}</Link>
          <br/>
          </td>
        </tr>
        ))}
      </tbody>
    </table>
    </>
  )
}

export default AdminPage