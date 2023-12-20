'use client'
import { useAuth } from "@/context/authcontext";
import Spinner from "@/components/common/spinner";
import Link from "next/link";
import moment from "moment";
import 'moment/min/locales';
import { isJson } from "@/helpers/strings";

const  UserList = ({ players }: {players: DbUser[]}) => {
  const { isAdmin } = useAuth()
  moment.locale('en-gb');
 
  if (!isAdmin) return <></>

  return (
    <>
    <h2>Users</h2>
    <table className="min-w-full text-left text-md font-light">
      <thead className="border-b font-medium dark:border-neutral-500">
        <tr className="bg-sky-200">
          <th className="px-3 md:px-6 py-4 text-center">num</th>
          <th className="px-3 md:px-6 py-2 text-center">name</th>
          <th className="px-3 md:px-6 py-2 text-center">session</th>
          <th className="px-3 md:px-6 py-2 text-center">geo</th>
          <th className="px-3 md:px-6 py-2 text-center">💶</th>
          {/* <th className="px-3 md:px-6 py-2 text-center">json</th> */}
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
          </td>
          <td>
          <>{p.flag} {p.username}</><br/>
          <div className="text-center font-thin text-sm">{moment(p.date).format('DD/MM/YYYY HH:mm')}</div>
          </td>
          <td>
            {isJson(p.user) ? JSON.parse(p.user).sessionid : p.user }<br/>
            {isJson(p.user) ? JSON.parse(p.user).date : '' }
          </td>
          <td>
          {isJson(p.user) && JSON.parse(p.user).my_zip +" "+ JSON.parse(p.user).my_city}<br/>
          {isJson(p.user) && JSON.parse(p.user).my_country}<br/>
          {isJson(p.user) && JSON.parse(p.user).email}
          </td>
          <td>
          💶: {isJson(p.user) && JSON.parse(p.user).totalbills}<br/>
          🏆: {isJson(p.user) && JSON.parse(p.user).totalhits}
          </td>
          {/* <td>
          {JSON.stringify(p)}
          </td> */}
        </tr>
        ))}
      </tbody>
    </table>
    </>
  )
}

export default UserList