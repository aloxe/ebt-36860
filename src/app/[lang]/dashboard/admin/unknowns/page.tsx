'use client'
import UnknownsView from "@/app/[lang]/dashboard/unknownsView";
import { useTranslation } from '@/i18n/client'
import { useEffect, useState } from "react";
import AdminLinks from "@/components/common/adminLinks";
import { getUser, getVisits } from "@/helpers/dbutils";
import Spinner from "@/components/common/spinner";
import { useSearchParams } from 'next/navigation'

const UnknownsAdmin = ({ params: { lang } }: { params: { lang: string } }) => {
  /* eslint-disable react-hooks/rules-of-hooks */
  const { t } = useTranslation(lang, 'dashboard')
  const [user, setUser] = useState<User | undefined>(undefined);
  const [visitedCities, setVisitedCities] = useState<City[] | undefined>(undefined);
  const [loading, setLoading] = useState<boolean>(false)
  const searchParams = useSearchParams()
  const user_id = searchParams.get("user_id") ?? ""
 
  useEffect(() => {
    if (user_id && !loading) {
      const fetchUserData = async (id: string) => {
        const userData: User = await getUser(id);
        if (userData?.id) {
          userData.isFake = true;
          setUser(userData)
        } else if (userData) {
          setUser({ 
            id,
            username: userData.toString(),
            isFake: true
          })
        } else {
          setUser({ 
            id,
            username: "la tête a Toto",
            isFake: true
          })
        }
      }
      setLoading(true);
      fetchUserData(user_id) 
    }
  }, [loading, user_id])

  useEffect(() => {
    if (user) {
      const fetchVisitedCities = async (id: string) => {
        const visitedCities: City[] = await getVisits(id, "fr");
        if (visitedCities) {
          setVisitedCities(visitedCities)
        } else {
          console.log("user without visited");
        }
      }
      fetchVisitedCities(user_id)
    }
  }, [user, user_id])

  const setVisited = (visited: Visited) => {
    console.log("set", visited);
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
        {!user || !visitedCities && <Spinner />}
        {user && visitedCities && <UnknownsView 
          lang={lang}
          user={user}
          visitedCities={visitedCities}
          setVisited={setVisited}
        />}
    </>
  )
}

export default UnknownsAdmin
