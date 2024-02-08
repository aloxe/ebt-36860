'use client'
import { useAuth } from "@/context/authcontext";
import UserDetails from "./userdetails";
import { useTranslation } from '@/i18n/client'
import AdminLinks from "@/components/common/adminLinks";
import { useState } from "react";
import dynamic from "next/dynamic";
import ListLocations from "./list";

const CitiesView = dynamic(() => import('./citiesView'))
const TitleButton = dynamic(() => import('@/components/common/titleButton'))
const ForumMenu = dynamic(() => import('./menu'))
const UnknownsView = dynamic(() => import('./unknownsView'))

export default function Dashboard({ params: { lang } }: { params: { lang: string } }) {
  /* eslint-disable react-hooks/rules-of-hooks */
  const { t } = useTranslation(lang, 'dashboard')
  const { visited, setVisited, user } = useAuth();
  const username = user ? user.username : "";
  const [isForum, setIsForum] = useState<boolean>(false);
  const [isList, setIsList] = useState<boolean>(false);

  const handleToForum = (event: React.MouseEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsList(isForum);
    setIsForum(!isForum);
  }

  const handleToList = (event: React.MouseEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsForum(isList);
    setIsList(!isList);
  }

  if (!user) {
    return (
      <div className="md:table border-spacing-x-4">
       <h3>{t('please-login')}</h3>
      </div>
    )
  }
  return (
      <>
      <AdminLinks lang={lang} />
      <div className="md:table border-spacing-x-4">
        <div className="md:basis-1/4 md:table-cell">
          { username && <UserDetails lang={lang} />}
        </div>
        <div className="md:basis-1/4 md:table-cell">
          { username && <CitiesView  lang={lang} user={user} />}
        </div>
      </div>

      { username && visited && !isForum && <TitleButton
            label={t('see-map-share')}
            href={"#forum"}
            callback={handleToForum}
      />}
      { username && visited && !isList && <TitleButton
            label={t('see-list-locations')}
            href={"#list"}
            callback={handleToList}
      />}
      {username && isList && visited && <ListLocations lang={lang} user={user} visited={visited} />}

      {username && isForum && visited && <ForumMenu lang={lang} user={user} visited={visited} />}

      {username && visited?.unknowns.length > 0 && <UnknownsView
        lang={lang}
        user={user}
        visitedCities={visited.visitedCities}
        setVisited={setVisited}
      />}
      </>
    )
}
