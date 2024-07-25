'use client'
import Link from "next/link";

const StatsMenu = ({ id }: {id: string }) => {

  return (
    <nav className="flex place-items-center justify-around sm:flex-row  p-2 m-2 sm:p-4 sm:m-4 md:text-md sm:text-sm text-xs">
      <Link href={`/stats/${id}/36680-communes`}>36680</Link>
      <Link href={`/stats/${id}/liste-communes`}>list</Link>
      <Link href={`/stats/${id}/carte-de-france`}>map</Link>
      <Link href={`/stats/${id}/tour-de-france`}>tour de France</Link>
      <Link href={`/stats/${id}/prefectures`}>préfectures</Link>
    </nav>
  )
}

export default StatsMenu
