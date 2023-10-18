import JeuCommunes from "@/components/stats/jeuCommunes";
import JeuPrefectures from "@/components/stats/jeuPrefectures";
import ListeCommunes from "@/components/stats/listeCommunes";
import MapCommunes from "@/components/stats/mapCommunes";
import Profile from "@/components/stats/profile";
import Summary from "@/components/stats/summary";
import TourDeFrance from "@/components/stats/tourDeFrance";
import { getUserVisited } from "@/helpers/dbutils";
import { getPublicUser } from "@/helpers/ebtutils";
import StatsMenu from "./menu";

const UserData = async ({ params }: { params: { id: string } }) => {
  const publicUser = await getPublicUser(params.id);
  const visited = await getUserVisited(params.id);

  return (
    <>
      <div className="md:table border-spacing-x-4">
          <Profile user={publicUser} className="md:basis-1/4 md:table-cell"/>
          <Summary user={publicUser} visited={visited}  className="md:basis-1/4 md:table-cell space-x-3"/>
      </div>
      <StatsMenu>
        <JeuCommunes user={publicUser} visited={visited} key="is36000" />
        <ListeCommunes user={publicUser} visited={visited} key="list" />
        <MapCommunes user={publicUser} visited={visited} key="list" />
        <TourDeFrance user={publicUser} visited={visited} key="tour" />
        <JeuPrefectures user={publicUser} visited={visited} key="pref" />
      </StatsMenu>
    </>
  )
}

export default UserData
