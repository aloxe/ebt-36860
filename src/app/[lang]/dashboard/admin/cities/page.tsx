'use client'
import CitiesView from "@/app/[lang]/dashboard/citiesView";
import { useTranslation } from '@/i18n/client'
import { useEffect, useState } from "react";
import AdminLinks from "@/components/common/adminLinks";
import { getPlayerData } from "@/helpers/dbutils";
import { useSearchParams } from 'next/navigation'

const CitesAdmin = ({ params: { lang } }: { params: { lang: string } }) => {
  /* eslint-disable react-hooks/rules-of-hooks */
  const { t } = useTranslation(lang, 'dashboard')
  const [user, setUser] = useState<User | undefined>(undefined);
  const [loading, setLoading] = useState<boolean>(false)
  const searchParams = useSearchParams()
  const user_id = searchParams.get("user_id") ?? ""

  useEffect(() => {
    if (user_id && !loading) {
      const fetchUserData = async (id: string) => {
        const userData: User = await getPlayerData("user", id);
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

  return (
    <>
      <div className="relative flex place-items-center before:absolute before:h-[300px] before:w-[480px] before:-translate-x-1/2 before:rounded-full before:bg-gradient-radial before:from-white before:to-transparent before:blur-2xl before:content-[''] after:absolute after:-z-20 after:h-[180px] after:w-[240px] after:translate-x-1/3 after:bg-gradient-conic after:from-sky-200 after:via-blue-200 after:blur-2xl after:content-[''] before:dark:bg-gradient-to-br before:dark:from-transparent before:dark:to-blue-700 before:dark:opacity-10 after:dark:from-sky-900 after:dark:via-[#0141ff] after:dark:opacity-40 before:lg:h-[360px] z-[-1]">
      </div>
        <AdminLinks lang={lang} />
        <h1>
          {!user && `No user yet`}
          {user && t('user-data', {"username": user.username})}
        </h1>
        {user && <CitiesView 
          lang={lang}
          user={user}
        />}
    </>
  )
}

export default CitesAdmin
