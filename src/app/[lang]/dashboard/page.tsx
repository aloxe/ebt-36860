'use client'
import { useAuth } from "@/context/authcontext";
import UserDetails from "./userdetails";
import CitiesView from "./citiesView";
import { UserMapView } from "./usermapView";
import { UnknownsView } from "./unknownsView";
import { useTranslation } from '@/i18n/client'

export default function Dashboard({ params: { lang } }: { params: { lang: string } }) {
  /* eslint-disable react-hooks/rules-of-hooks */
  const { t } = useTranslation(lang, 'dashboard')
  const { visited, user, setVisited, setPolygons} = useAuth();
  const username = user ? user.username : "";

  return (
      <>
      <div className="relative flex place-items-center before:absolute before:h-[300px] before:w-[480px] before:-translate-x-1/2 before:rounded-full before:bg-gradient-radial before:from-white before:to-transparent before:blur-2xl before:content-[''] after:absolute after:-z-20 after:h-[180px] after:w-[240px] after:translate-x-1/3 after:bg-gradient-conic after:from-sky-200 after:via-blue-200 after:blur-2xl after:content-[''] before:dark:bg-gradient-to-br before:dark:from-transparent before:dark:to-blue-700 before:dark:opacity-10 after:dark:from-sky-900 after:dark:via-[#0141ff] after:dark:opacity-40 before:lg:h-[360px] z-[-1]">
        <h1>
          {!user && `You need to log in to see this page…`}
          {username && t('dashboard', {"username": username})}
        </h1>
      </div>
      {user?.username && <UserDetails lang={lang} />}
      {user?.username && <CitiesView 
        lang={lang}
        user={user}
      />}
      {user?.username && visited && <UserMapView 
        lang={lang}
        visited={visited}
        user={user} 
        savePolygons={setPolygons} 
      />}
      {user?.username && visited?.unknowns.length > 0 && <UnknownsView 
        lang={lang}
        visited={visited}
        user={user}
        saveVisited={setVisited} 
      />}
      </>
    )
}
