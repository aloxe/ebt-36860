'use client'
import { useAuth } from "@/context/authcontext";
import Spinner from "@/components/common/spinner";
import Link from "next/link";
import moment from "moment";
import 'moment/min/locales';

const  AdminPage = ({ players }: {players: DbUser[]}) => {
  const { isAdmin } = useAuth()
  moment.locale('en-gb');

  if (!isAdmin) return <></>

  return (
    <>
    <h2>Players</h2>
    <table className="min-w-full text-left text-md font-light">
      <thead className="border-b font-medium dark:border-neutral-500">
        <tr className="bg-sky-200">
          <th className="px-3 md:px-6 py-4 text-center">1</th>
          <th className="px-3 md:px-6 py-2 text-center">2</th>
          <th className="px-3 md:px-6 py-2 text-center">3</th>
          {/* <th className="whitespace-nowrap px-6 py-4">map</th> */}
        </tr>
      </thead>
      <tbody>
        {!players &&
        <tr><td><Spinner /></td></tr>
        }
        {players && players.map((p) => (
        <tr className="h-1 bg-slate-100 border-b dark:border-neutral-500 text-md hover:bg-amber-50"
        key={p.id}>
          <td>
          {p.id}<br />
          <>{p.flag} {p.username}</><br/>
          <div className="text-center font-thin text-sm">{moment(p.date).format('DD/MM/YYYY HH:mm')}</div>
          </td>
          <td>

            {p.count?.communes < 1 && <>
              <Link href={{ pathname: 'cities', query: { user_id: p.id } }}>communes non récupérées</Link>
            </>}
            {p.count && p.count.communes > 1 && <>
              <Link href={{ pathname: 'cities', query: { user_id: p.id } }}>Locations</Link>: {p.count?.all}<br/>
              <b>communes: {p.count?.communes}</b><br/>
              Dpt: {p.count?.departements}<br/>
            </>}
          </td>
          <td>
          {!!p.count?.unknowns &&
          <>
            <Link href={{ pathname: 'unknowns', query: { user_id: p.id } }}>unknowns: {p.count?.unknowns}</Link>
            <br/>
          </>}
          {!p.count?.unknowns && <>All known<br/></>}
          <Link href={{ pathname: 'usermap', query: { user_id: p.id } }}>Carte: {p.polygons === "{}" ? "☐" : "☑"}</Link>
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
