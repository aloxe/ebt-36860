'use client'
import { getPlayerData, savePlayerData } from "@/helpers/dbutils";
import { useEffect, useState } from "react";
import { UnknownsView } from "../../unknownsView";

interface UnknownsAdmin {
  searchParams?: { [key: string]: string | undefined };
}

 const UnknownsAdmin = ({searchParams}: UnknownsAdmin) => {
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

  const saveVisited = (user: User, visited: Visited) => {
    console.log(user);
    console.log(visited);
    savePlayerData(user?.id, visited)
  }

  return (
  <>
    {!user_id && <>Hello,</>}
    {user_id && <h1>Hello {user_id}</h1>}
    {user && visited && <UnknownsView 
      visited={visited}
      user={user}
      saveVisited={() => saveVisited}
    />}


  </>)
}

export default UnknownsAdmin;
