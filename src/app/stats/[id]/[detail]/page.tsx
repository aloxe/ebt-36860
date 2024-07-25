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

const UserDataDetail = async ({ params }: { params: { id: string, detail: string } }) => {
  const publicUser = await getPublicUser(params.id);
  const visited = await getUserVisited(params.id);
  const {id, detail } = params;

  return (
    <>
      <div className="md:table border-spacing-x-4">
        {/*TODO collapse these two on detail page */}
        <Profile user={publicUser} className="md:basis-1/4 md:table-cell"/>
        <Summary user={publicUser} visited={visited}  className="md:basis-1/4 md:table-cell space-x-3"/>
      </div>
      <StatsMenu id={id} />
      {detail === "36680-communes" && <JeuCommunes user={publicUser} visited={visited} key="is36000" />}
      {detail === "liste-communes" && <ListeCommunes user={publicUser} visited={visited} key="list" />}
      {detail === "carte-de-france" && <MapCommunes user={publicUser} visited={visited} key="map" />}
      {detail === "tour-de-france" && <TourDeFrance user={publicUser} visited={visited} key="tour" />}
      {detail === "prefectures" && <JeuPrefectures user={publicUser} visited={visited} key="pref" />}
    </>
  )
}

export default UserDataDetail
