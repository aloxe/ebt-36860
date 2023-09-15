'use client'
import { useAuth } from "@/hooks/authprovider"
import {MyMapComponent} from "@/components/Map/map";
import { useState } from "react";


export function UserMap() {
  const { user, visited } = useAuth();
  const [showDep, setShowDep] = useState<boolean>(false);
  const [showCom, setShowCom] = useState<boolean>(false);

  return (
    <div className="bg-white rounded-lg border border-blue-200 text-left text-blue-900 p-4 m-5">
      <div className="flex justify-between">
        <h2>{user.username}&apos;s map</h2>
                
      </div>
      <div className="flex justify-around">
        <div className="mb-[0.125rem] block min-h-[1.5rem] pl-[1.5rem]">
        <label 
          className="inline-block pl-[0.15rem] hover:cursor-pointer"
          htmlFor='dep'>
          <input 
          className="form-check-input h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
            id='dep' value='dep' type="checkbox" checked={showDep} 
            onChange={() => setShowDep(!showDep)} /> départements
        </label>
        </div>

        <div className="mb-[0.125rem] block min-h-[1.5rem] pl-[1.5rem]">
          <input
            className="form-check-input h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
            type="checkbox" checked={showCom} value="com" id="com"
            onChange={() => setShowCom(!showCom)}
             />
          <label
            className="inline-block pl-[0.15rem] hover:cursor-pointer"
            htmlFor="com"> communes
          </label>
        </div>
      </div>
      <div className="w-full h-90 bg-orange-200 overflow-hidden">
        <MyMapComponent departements={visited?.departements} showDep={showDep} showCom={showCom} />
      </div>
    </div>
    )
}
