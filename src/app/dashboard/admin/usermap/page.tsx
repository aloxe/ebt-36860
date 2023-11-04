'use client'
import { getPlayerData, savePlayerData } from "@/helpers/dbutils";
import { useEffect, useState } from "react";
import Link from "next/link";
import { UserMapView } from "../../usermapView";

interface UnknownsAdmin {
  searchParams?: { [key: string]: string | undefined };
}

 const UserMapAdmin = ({searchParams}: UnknownsAdmin) => {
  const [visited, setVisited] = useState<Visited | undefined>(undefined)
  const [user, setUser] = useState<User | undefined>(undefined)
  const user_id = searchParams?.user_id ? searchParams?.user_id.replaceAll("\"", "") : "";

  useEffect(() => {
    const fetchContent = async () => {
      const content = await getPlayerData("content", user_id)
      setVisited(content)
    }
    fetchContent()
  }, [user_id])

  useEffect(() => {
    const fetchContent = async () => {
      const user = await getPlayerData("user", user_id)
      setUser(user)
    }
    fetchContent()
  }, [user_id])

  const savePolygons = (polygons: any) => {
    savePlayerData(user_id, polygons)
  }

  return (
  <>
    {!user_id && <>Hello,</>}
    {user_id && <h1>
      Hello <>{user?.username || user}</> {user_id} 
      </h1>}
      {user && <div><Link href="/dashboard/admin/">« back to admin</Link></div>}
    {user && visited && 
    <UserMapView visited={visited} user={user} savePolygons={savePolygons} />
    }


  </>)
}

export default UserMapAdmin;
