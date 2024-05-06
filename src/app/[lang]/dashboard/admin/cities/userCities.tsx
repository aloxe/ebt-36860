'use client'
import CitiesView from "@/app/[lang]/dashboard/citiesView";
import { useTranslation } from '@/i18n/client'
import { useEffect, useState } from "react";
import { getUser } from "@/helpers/dbutils";
import { useSearchParams } from 'next/navigation'

const UserCites = ({ lang }: { lang: string }) => {
  /* eslint-disable react-hooks/rules-of-hooks */
  const { t } = useTranslation(lang, 'dashboard')
  const [user, setUser] = useState<User | undefined>(undefined);
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

  return (
    <>
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

export default UserCites
