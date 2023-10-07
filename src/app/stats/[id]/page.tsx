import JeuCommunes from "@/components/stats/jeuCommunes";
import JeuPrefectures from "@/components/stats/jeuPrefectures";
import ListeCommunes from "@/components/stats/listeCommunes";
import Summary from "@/components/stats/summary";
import TourDeFrance from "@/components/stats/tourDeFrance";
import { getUserVisited } from "@/helpers/dbutils";
import { getPublicUser } from "@/helpers/ebtutils";
import UserDetails from "./details";

const UserData = async ({ params }: { params: { id: string } }) => {
  const publicUser = await getPublicUser(params.id);
  const visited = await getUserVisited(params.id);

  return (
    <>
      <Summary user={publicUser} visited={visited}/>
      <UserDetails>
        <JeuCommunes user={publicUser} visited={visited} key="is36000" />
        <ListeCommunes user={publicUser} visited={visited} key="list" />
        <TourDeFrance user={publicUser} visited={visited} key="tour" />
        <JeuPrefectures user={publicUser} visited={visited} key="pref" />
      </UserDetails>
    </>
  )
}

export default UserData

  // <div className={is36860 ? "" : "hidden"}><JeuCommunes user={user} visited={visited} /></div>
  // {is36860} ⋅ {list} ⋅ {map}⋅ {tour} ⋅ {pref}
  // <div className={list ? "" : "hidden"}><TourDeFrance user={user} visited={visited}/></div>
  // <div className={tour ? "" : "hidden"}><TourDeFrance user={user} visited={visited}/></div>
  // <div className={pref ? "" : "hidden"}><JeuPrefectures user={user} visited={visited}/></div>