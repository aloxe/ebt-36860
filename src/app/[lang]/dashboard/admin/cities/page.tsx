'use client'
import { getPlayerData, savePlayerData } from "@/helpers/dbutils";
import { useEffect, useState } from "react";
import Link from "next/link";
import { CitiesView } from "../../citiesView";

interface CitiesAdmin {
  searchParams?: { [key: string]: string | undefined };
}

 const CitiesAdmin = ({searchParams}: CitiesAdmin) => {
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

  const saveVisited = (visited: Visited) => {
    savePlayerData(user_id, visited)
  }

  return (
  <>
    {!user_id && <>Hello,</>}
    {user_id && <h1>
      Hello <>{user?.username || user}</> {user_id} 
      </h1>}
      {user && <div><Link href="/dashboard/admin/">« back to admin</Link></div>}
    {user && visited && <CitiesView
      visited={visited}
      user={user}
      saveVisited={saveVisited}
    />}


  </>)
}

export default CitiesAdmin;
