'use client'
import CitiesView from "@/app/[lang]/dashboard/citiesView";
import { useTranslation } from '@/i18n/client'
import { useEffect, useState } from "react";
import AdminLinks from "@/components/common/adminLinks";

export default function Dashboard({ params: { lang }, searchParams }: { params: { lang: string }, searchParams?: { [key: string]: string | undefined } }) {
  /* eslint-disable react-hooks/rules-of-hooks */
  const { t } = useTranslation(lang, 'dashboard')
  const [user, setUser] = useState<User | undefined>(undefined);

  useEffect(() => {
    if (!user) {
      const user_id = searchParams?.user_id ? searchParams?.user_id.replaceAll("\"", "") : "";
      setUser({ 
        id: parseInt(user_id),
        username: "Essai Toto",
        isFake: true
      })
    }
  }, [user, searchParams?.user_id])

  return (
    <>
      <div className="relative flex place-items-center before:absolute before:h-[300px] before:w-[480px] before:-translate-x-1/2 before:rounded-full before:bg-gradient-radial before:from-white before:to-transparent before:blur-2xl before:content-[''] after:absolute after:-z-20 after:h-[180px] after:w-[240px] after:translate-x-1/3 after:bg-gradient-conic after:from-sky-200 after:via-blue-200 after:blur-2xl after:content-[''] before:dark:bg-gradient-to-br before:dark:from-transparent before:dark:to-blue-700 before:dark:opacity-10 after:dark:from-sky-900 after:dark:via-[#0141ff] after:dark:opacity-40 before:lg:h-[360px] z-[-1]">
        <h1>
          {!user && `No user yet`}
          {user && t('user-data', {"username": user.username})}
        </h1>
      </div>
        <AdminLinks lang={lang} />
        {user && <CitiesView 
          lang={lang}
          user={user}
        />}
    </>
  )
}
