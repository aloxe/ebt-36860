'use client'
import { useAuth } from "@/hooks/authprovider"
import {MyMapComponent} from "@/components/map";


export function UserMap() {
  const { user, setUser, visited } = useAuth();

  return (
    <div className="bg-white rounded-lg border border-blue-200 text-left text-blue-900 p-4 m-5">
      <div className="flex justify-between">
        <h2>{user.username}&apos;s map</h2>
      </div>
      <div className="w-full h-90 bg-orange-200 overflow-hidden">
        <MyMapComponent departements={visited?.departements} />
      </div>
    </div>
    )
}
