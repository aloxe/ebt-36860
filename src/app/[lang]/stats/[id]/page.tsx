import Profile from "@/components/stats/profile";
import Summary from "@/components/stats/summary";
import { getUserVisited } from "@/helpers/dbutils";
import { getPublicUser } from "@/helpers/ebtutils";
import StatsMenu from "./menu";

const UserData = async ({ params }: { params: { lang: string, id: string } }) => {
  const { lang, id } = params;
  const publicUser = await getPublicUser(id);
  const visited = await getUserVisited(id);

  return (
    <>
      <div className="md:table border-spacing-x-4">
        <Profile lang={lang} user={publicUser} className="md:basis-1/4 md:table-cell"/>
        <Summary lang={lang} user={publicUser} visited={visited}  className="md:basis-1/4 md:table-cell space-x-3"/>
      </div>
      <StatsMenu lang={lang} id={id} />
    </>
  )
}

export default UserData
