'use client'
import { useState } from "react";

const UserDetails = ({ children }: {children: JSX.Element[] }) => {
const [is36860, setIs36860] = useState(true)
const [list, setList] = useState(false)
const [map, setMap] = useState(false)
const [tour, setTour] = useState(false)
const [pref, setPref] = useState(false)

const handleClick = (event : React.MouseEvent<HTMLButtonElement>) => {
  // @ts-ignore
  setIs36860(event.target.id === "is36860")
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
      <nav className="flex place-items-center justify-around sm:flex-row px-2 mx-5">
        <button 
          id="is36860"
          className={`${is36860 ? "border-b-2 border-blue-900" : ""} text-gray-600 py-4 px-6 block hover:text-blue-900`}
          onClick={handleClick}>
            36860
        </button>
        <button 
        id="list"
          className={`${list ? "border-b-2 border-blue-900" : ""} text-gray-600 py-4 px-6 block hover:text-blue-900`}
        onClick={handleClick}>
            list
        </button>
        <button 
          id="map"
          className={`${map ? "border-b-2 border-blue-900" : ""} text-gray-600 py-4 px-6 block hover:text-blue-900`}
          onClick={handleClick}>
            map
        </button>
        <button 
          id="tour"
          className={`${tour ? "border-b-2 border-blue-900" : ""} text-gray-600 py-4 px-6 block hover:text-blue-900`}
          onClick={handleClick}>
            tour de France
        </button>
        <button 
          id="pref"
          className={`${pref ? "border-b-2 border-blue-900" : ""} text-gray-600 py-4 px-6 block hover:text-blue-900`}
          onClick={handleClick}>
            préfectures
        </button>
      </nav>
      {is36860 && children[0]}
      {list && children[1]}
      {map && children[2]}
      {tour && children[3]}
      {pref && children[4]}
    </>
  )
}

export default UserDetails