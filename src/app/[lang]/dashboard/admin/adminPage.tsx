'use client'
import { useAuth } from "@/context/authcontext";
import Spinner from "@/components/common/spinner";
import Profile from "@/components/stats/profile";
import { useAuth } from "@/context/authcontext";
import { refreshUser } from "@/helpers/ebtutils";
import { getNewPlayers } from "@/helpers/leaderutils";
import { formatDate, getUserFlag } from "@/helpers/strings";
import Link from "next/link";
import { useState } from "react";

const  AdminPage = ({ players }: {players: DbUser[]}) => {
  const { isAdmin } = useAuth()
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
        {players && players.map((p, index) => (
        <tr className="h-1 bg-slate-100 border-b dark:border-neutral-500 text-md hover:bg-amber-50"
        key={p.user_id}>
          <td>
          {index} ‒ {p.user_id}<br /><>{p.flag} {p.username}</><br/>
          {formatDate(p.date)}

          </td>
          <td>

            {!p.visited?.communes && <>
              <Link href={{ pathname: 'cities', query: { user_id: JSON.stringify(p.user_id) } }}>communes non récupérées</Link>
            </>}
            {p.visited?.communes && <>
              <Link href={{ pathname: 'cities', query: { user_id: JSON.stringify(p.user_id) } }}>Locations</Link>: {p.visited?.visitedCities?.length}<br/>
              communes: {p.visited?.communes?.length}<br/>
              Dpt: {p.visited?.departements?.length}<br/>
            </>}
          </td>
          <td>

          {p.visited?.unknown && p.visited?.unknown > 0 && <>
            <Link href={{ pathname: 'unknowns', query: { user_id: JSON.stringify(p.user_id) } }} >unknown: {p.visited?.unknown?.toString()}</Link><br/></>}
          Carte: {p.polygons === "{}" ? "☐" : "☑"}<br/>

          </td>
        </tr>
        ))}
      </tbody>
    </table>
    </>
  )
}

export default AdminPage
