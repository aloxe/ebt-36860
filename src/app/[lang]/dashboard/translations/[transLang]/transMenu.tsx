'use client'
import Link from "next/link";

const TransMenu = ({ lang, transLang, ns }: {lang: string, transLang: string, ns?: string}) => {

  const namespaces = ["dashboard", "faq", "home", "leaderboard", "stats", "translations"];

  return (
    <nav className="flex place-items-center justify-around sm:flex-row  p-2 m-0 sm:p-4 md:text-md sm:text-sm text-xs">
      {namespaces.map( name => {
        return <>
        {name === ns && <><b>{name}</b></>}
        {name !== ns && <Link href={`/${lang}/dashboard/translations/${transLang}/${name}`}>{name}</Link>}
        {name !== "translations" && <> |</>}</>} 
      )}
    </nav>
  )
}

export default TransMenu