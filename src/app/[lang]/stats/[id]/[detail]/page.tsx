import JeuCommunes from "@/components/stats/jeuCommunes";
import JeuPrefectures from "@/components/stats/jeuPrefectures";
import ListeCommunes from "@/components/stats/listeCommunes";
import MapCommunes from "@/components/stats/mapCommunes";
import Profile from "@/components/stats/profile";
import Summary from "@/components/stats/summary";
import TourDeFrance from "@/components/stats/tourDeFrance";
import { getCountsServer, getVisitsServer } from "@/helpers/dbutils";
import { getPublicUser } from "@/helpers/ebtutils";
import StatsMenu from "./../menu";
import StatsHeader from "../header";

const UserDataDetail = async ({ params }: { params: { lang: string, id: string, detail: string } }) => {
  const { lang, id, detail } = params;
  const publicUser = await getPublicUser(id);
  const visits = await getVisitsServer(id, "fr");
  const counts = await getCountsServer(id, "date,communes,departements,prefectures,count");
  
  return (
    <>
      <StatsHeader lang={lang} id={id} user={publicUser} date={counts ? counts.date : undefined} count={counts ? JSON.parse(counts.count) : undefined} />
      <StatsMenu lang={lang} id={id} />

      {detail === "36680-communes" && <JeuCommunes lang={lang} 
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
        key="tour" 
      />}
      {detail === "prefectures" && <JeuPrefectures 
        lang={lang} 
        user={publicUser} 
        prefectures={counts ? JSON.parse(counts.prefectures) : []}
        cities={visits ? JSON.parse(visits.fr) : []}
        key="pref" 
      />}
    </>
  )
}

export default UserDataDetail
