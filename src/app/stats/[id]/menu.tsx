'use client'
import { useState } from "react";

const StatsMenu = ({ children }: {children: JSX.Element[] }) => {
const [is36680, setIs36680] = useState(true)
const [list, setList] = useState(false)
const [map, setMap] = useState(false)
const [tour, setTour] = useState(false)
const [pref, setPref] = useState(false)

const handleClick = (event : React.MouseEvent<HTMLButtonElement>) => {
  // @ts-ignore
  setIs36680(event.target.id === "is36680")
  // @ts-ignore
  setList(event.target.id === "list")
  // @ts-ignore
  setMap(event.target.id === "map")
  // @ts-ignore
  setTour(event.target.id === "tour")
  // @ts-ignore
  setPref(event.target.id === "pref")
}

  return (
    <>
      <nav className="flex place-items-center justify-around sm:flex-row  sm:p-4 sm:m-4 xs:p-2 xs:m-2 md:text-md sm:text-sm xs:text-xs">
        <button 
          id="is36680"
          className={`${is36680 ? "border-b-2 border-blue-900" : ""} text-gray-600 block hover:text-blue-900 md:py-4 md:px-6 sm:py-2 sm:px-4 xs:py-2`}
          onClick={handleClick}>
            36680
        </button>
        <button 
        id="list"
          className={`${list ? "border-b-2 border-blue-900" : ""} text-gray-600 block hover:text-blue-900`}
        onClick={handleClick}>
            list
        </button>
        <button 
          id="map"
          className={`${map ? "border-b-2 border-blue-900" : ""} text-gray-600 block hover:text-blue-900`}
          onClick={handleClick}>
            map
        </button>
        <button 
          id="tour"
          className={`${tour ? "border-b-2 border-blue-900" : ""} text-gray-600 block hover:text-blue-900`}
          onClick={handleClick}>
            tour de France
        </button>
        <button 
          id="pref"
          className={`${pref ? "border-b-2 border-blue-900" : ""} text-gray-600 block hover:text-blue-900`}
          onClick={handleClick}>
            préfectures
        </button>
      </nav>
      {is36680 && children[0]}
      {list && children[1]}
      {map && children[2]}
      {tour && children[3]}
      {pref && children[4]}
    </>
  )
}

export default StatsMenu