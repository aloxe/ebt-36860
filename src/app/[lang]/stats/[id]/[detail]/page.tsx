import JeuCommunes from "@/components/stats/jeuCommunes";
import JeuPrefectures from "@/components/stats/jeuPrefectures";
import ListeCommunes from "@/components/stats/listeCommunes";
import MapCommunes from "@/components/stats/mapCommunes";
import Profile from "@/components/stats/profile";
import Summary from "@/components/stats/summary";
import TourDeFrance from "@/components/stats/tourDeFrance";
import { getUserVisited } from "@/helpers/dbutils";
import { getPublicUser } from "@/helpers/ebtutils";
import StatsMenu from "./../menu";

const UserDataDetail = async ({ params }: { params: { lang: string, id: string, detail: string } }) => {
  const { lang, id, detail } = params;
  const publicUser = await getPublicUser(id);
  const visited = await getUserVisited(id);

  return (
    <>
      <div className="md:table border-spacing-x-4">
        {/*TODO collapse these two on detail page */}
        <Profile lang={lang} user={publicUser} className="md:basis-1/4 md:table-cell"/>
        <Summary lang={lang} user={publicUser} visited={visited}  className="md:basis-1/4 md:table-cell space-x-3"/>
      </div>
      <StatsMenu lang={lang} id={id} />
      {detail === "36680-communes" && <JeuCommunes lang={lang} user={publicUser} visited={visited} key="is36000" />}
      {detail === "liste-communes" && <ListeCommunes lang={lang} user={publicUser} visited={visited} key="list" />}
      {detail === "carte-de-france" && <MapCommunes lang={lang} user={publicUser} visited={visited} key="map" />}
      {detail === "tour-de-france" && <TourDeFrance lang={lang} user={publicUser} visited={visited} key="tour" />}
      {detail === "prefectures" && <JeuPrefectures lang={lang} user={publicUser} visited={visited} key="pref" />}
    </>
  )
}

export default UserDataDetail
