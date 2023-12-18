'use client'
import { useTranslation } from '@/i18n/client'
import { useState } from "react";
import ForumJeuCommunes from "./forumJeuCommunes";
import { UserMapView } from "./usermapView";
import TourDeFrance from "@/components/common/tourDeFrance";
import JeuPrefectures from '@/components/common/jeuPrefectures';

const ForumMenu = ({ lang, user, visited }: {lang: string, user: User, visited: Visited }) => {
  /* eslint-disable react-hooks/rules-of-hooks */
  const { t } = useTranslation(lang, 'stats')
  const [is36680, setIs36680] = useState<boolean>(false);
  const [isMap, setIsMap] = useState<boolean>(false);
  const [isTourdefrance, setIsTourdefrance] = useState<boolean>(false);
  const [isPrefectures, setIsPrefectures] = useState<boolean>(false);
  const { communes, departements, prefectures, visitedCities } = visited;

  const tourHeading = t('tour-de-france', {"username": user.username})
  const prefecturesHeading = t('user-prefectures', {"username": user.username})

  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
      event.preventDefault();
      const id = event.currentTarget.id;
      setIs36680(id === "is36680")
      setIsMap(id === "isMap")
      setIsTourdefrance(id === "isTourdefrance")
      setIsPrefectures(id === "isPrefectures")
    }

  return (
  <>
    <div className=" block group bg-white rounded-lg border border-blue-200 text-left p-0 m-2 sm:m-4">
      <nav className="flex place-items-center justify-around sm:flex-row  p-2 m-0 sm:p-4 md:text-md sm:text-sm text-xs">
        <div className="link" id="is36680" onClick={handleClick}>36680</div>
        <div className="link" id="isMap" onClick={handleClick}>{t("map")}</div>
        <div className="link" id="isTourdefrance" onClick={handleClick}>tour de France</div>
        <div className="link" id="isPrefectures" onClick={handleClick}>{t("hq", {count: 2})}</div>
      </nav>
    </div>

    {!is36680 && !isTourdefrance && !isPrefectures && <></>}
    {is36680 && <ForumJeuCommunes 
      lang={lang} 
      user={user} 
      communes={communes} />}
    {isMap && <UserMapView lang={lang} user={user} />}
    {isTourdefrance && <TourDeFrance 
      lang={lang}  
      user={user} 
      departements={departements} 
      heading={tourHeading} 
      isDashboard={true} />}
    {isPrefectures && <JeuPrefectures 
        lang={lang} 
        user={user} 
        prefectures={prefectures}
        cities={visitedCities}
        heading={prefecturesHeading}
        isDashboard={true}
      />}

  </>
  )
}

export default ForumMenu