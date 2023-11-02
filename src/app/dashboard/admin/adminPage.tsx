'use client'
import Spinner from "@/components/common/spinner";
import Profile from "@/components/stats/profile";
import { useAuth } from "@/context/authcontext";
import { refreshUser } from "@/helpers/ebtutils";
import { getNewPlayers } from "@/helpers/leaderutils";
import { formatDate, getUserFlag } from "@/helpers/strings";
import { useState } from "react";

const  AdminPage = ({ players }: {players: DbUser[]}) => {
  // const { user } = useAuth();
  // const isAdmin = user?.id === 31378;

  console.log(players[5].polygons);
  console.log('👆 =============');
  
  // if (!isAdmin) return <></>
  return (
    <>
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
        {players && players.map( async (p, index) => (
        <tr className="h-1 bg-slate-100 border-b dark:border-neutral-500 text-md hover:bg-amber-50"
        key={p.user_id}>
          <td>
          {index} ‒ {p.user_id}<br /><>{p.flag} {p.username}</><br/>
          {formatDate(p.date)}

          </td>
          <td>
          Locations: {p.visited?.visitedCities.length}<br/>
          communes: {p.visited?.communes.length}<br/>
          Dpt: {p.visited?.departements.length}<br/>
          </td>
          <td>

          unknown: {p.visited?.unknown?.toString()}<br/>
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