import { use } from 'react';
import StatJeuCommunes from "@/app/[lang]/stats/[id]/[detail]/statJeuCommunes";
import JeuPrefectures from "@/components/common/jeuPrefectures";
import ListeCommunes from "@/components/stats/listeCommunes";
import MapCommunes from "@/components/stats/mapCommunes";
import TourDeFrance from "@/components/common/tourDeFrance";
import { getCountsServer, getVisitsServer } from "@/helpers/dbutils";
import { getPublicUser } from "@/helpers/ebtutils";
import StatsMenu from "@/app/[lang]/stats/[id]/menu";
import StatsHeader from "@/app/[lang]/stats/[id]/header";
import { useTranslation } from '@/i18n'

type Params = Promise<{ lang: string, id: string, detail: string }>

const UserDataDetail = async ({ params }: { params: Params }) => {
  const { lang, id, detail } = use(params); 
  const { t } = await useTranslation(lang, 'stats')
  const publicUser = await getPublicUser(id);
  const visits = await getVisitsServer(id, "fr");
  const counts = await getCountsServer(id, "date,communes,departements,prefectures,count");
  
  const tourHeading = t('tour-de-france', {"username": publicUser.username})
  const prefecturesHeading = t('user-prefectures', {"username": publicUser.username})
  return (
    <>
      <StatsHeader lang={lang} id={id} user={publicUser} date={counts ? counts.date : undefined} count={counts ? JSON.parse(counts.count) : undefined} />
      <StatsMenu lang={lang} id={id} />

      {detail === "36680-communes" && <StatJeuCommunes lang={lang} 
        user={publicUser} 
        communes={counts ? JSON.parse(counts.communes) : []} 
        key="is36000" 
      />}
      {detail === "liste-communes" && <ListeCommunes 
        lang={lang} 
        user={publicUser} 
        communes={counts ? JSON.parse(counts.communes) : []} 
        prefectures={counts ? JSON.parse(counts.prefectures) : []} 
        key="list" 
      />}
      {detail === "carte-de-france" && <MapCommunes 
        lang={lang} 
        user={publicUser} 
        communes={counts ? JSON.parse(counts.communes) : []} 
        departements={counts ? JSON.parse(counts.departements) : []} 
        key="map" 
      />}
      {detail === "tour-de-france" && <TourDeFrance 
        lang={lang} 
        user={publicUser}
        departements={counts ? JSON.parse(counts.departements) : []} 
        heading={tourHeading}
        key="tour" 
      />}
      {detail === "prefectures" && <JeuPrefectures 
        lang={lang} 
        user={publicUser} 
        prefectures={counts ? JSON.parse(counts.prefectures) : []}
        cities={visits ? JSON.parse(visits.fr) : []}
        heading={prefecturesHeading}
        key="pref" 
      />}
    </>
  )
}

export default UserDataDetail
