'use client'
import UnknownsView from "@/app/[lang]/dashboard/unknownsView";
import { useTranslation } from '@/i18n/client'
import { useEffect, useState } from "react";
import AdminLinks from "@/components/common/adminLinks";
import { getPlayerData } from "@/helpers/dbutils";
import Spinner from "@/components/common/spinner";

const UnknownsAdmin = ({ params: { lang }, searchParams }: { params: { lang: string }, searchParams?: { [key: string]: string | undefined } }) => {
  /* eslint-disable react-hooks/rules-of-hooks */
  const { t } = useTranslation(lang, 'dashboard')
  const [user, setUser] = useState<User | undefined>(undefined);
  const [userVisited, setUserVisited] = useState<Visited | undefined>(undefined);
  const [loading, setLoading] = useState<boolean>(false)

  useEffect(() => {
    if (!loading) {
      const user_id = searchParams?.user_id ? searchParams?.user_id.replaceAll("\"", "") : "";  
      const fetchUserData = async (id: string) => {
        const userData: User = await getPlayerData("user", id);
        if (userData) {
          userData.isFake = true;
          setUser(userData)
        } else {
          setUser({ 
            id: parseInt(user_id),
            username: "La tête à Toto",
            isFake: true
          })
        }
      }
      setLoading(true);
      fetchUserData(user_id)
    }
  }, [loading])

  useEffect(() => {
    if (user) {
      const user_id = searchParams?.user_id ? searchParams?.user_id.replaceAll("\"", "") : "";  
      const fetchUserVisitedData = async (id: string) => {
        const userVisited: Visited = await getPlayerData("content", id);
        if (userVisited) {
          setUserVisited(userVisited)
        } else {
          console.log("user without visited");
          
        }
      }
      console.log(fetchUserVisitedData);
      
      fetchUserVisitedData(user_id)
    }
  }, [user])

  const setVisited = (visited: Visited) => {
    console.log("set", visited);
    console.log("not really useful here (admin)");
  }

  return (
    <>
      <div className="relative flex place-items-center before:absolute before:h-[300px] before:w-[480px] before:-translate-x-1/2 before:rounded-full before:bg-gradient-radial before:from-white before:to-transparent before:blur-2xl before:content-[''] after:absolute after:-z-20 after:h-[180px] after:w-[240px] after:translate-x-1/3 after:bg-gradient-conic after:from-sky-200 after:via-blue-200 after:blur-2xl after:content-[''] before:dark:bg-gradient-to-br before:dark:from-transparent before:dark:to-blue-700 before:dark:opacity-10 after:dark:from-sky-900 after:dark:via-[#0141ff] after:dark:opacity-40 before:lg:h-[360px] z-[-1]">
      </div>
        <AdminLinks lang={lang} />
        <h1>
          {!user && `No user yet`}
          {user && t('user-data', {"username": user.username})}
        </h1>
        {!user || !userVisited && <Spinner />}
        {user && userVisited && <UnknownsView 
          lang={lang}
          user={user}
          visited={userVisited}
          setVisited={setVisited}
        />}
    </>
  )
}

export default UnknownsAdmin
