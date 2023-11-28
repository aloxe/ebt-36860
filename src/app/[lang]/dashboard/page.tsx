'use client'
import { useAuth } from "@/context/authcontext";
import UserDetails from "./userdetails";
import CitiesView from "./citiesView";
import { UserMapView } from "./usermapView";
import { UnknownsView } from "./unknownsView";
import { useTranslation } from '@/i18n/client'
import TitleButton from "@/components/common/titleButton";
import AdminLinks from "@/components/common/adminLinks";
import { useState } from "react";
import ForumMenu from "./menu";

export default function Dashboard({ params: { lang } }: { params: { lang: string } }) {
  /* eslint-disable react-hooks/rules-of-hooks */
  const { t } = useTranslation(lang, 'dashboard')
  const { visited, user } = useAuth();
  const username = user ? user.username : "";
  const [isForum, setIsForum] = useState<boolean>(false);

  const handleToForum = (event: React.MouseEvent<HTMLDivElement>) => {
    event.preventDefault();
    console.log(event);
    setIsForum(!isForum);
  }

  if (!user) {
    return (
      <div className="md:table border-spacing-x-4">
       <h3>You need to log in to see this page…</h3>
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
            label={t('Share your results on Forum')}
            href={"#forum"}
            callback={handleToForum}
      />}
      {username && isForum && visited && <ForumMenu lang={lang} user={user} visited={visited} />}

      {username && visited?.unknowns.length > 0 && <UnknownsView 
        lang={lang}
        user={user}
      />}
      </>
    )
}
