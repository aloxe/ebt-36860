import Profile from "@/components/stats/profile";
import Summary from "@/components/stats/summary";
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
      <StatsMenu id={params.id} />
    </>
  )
}

export default UserData
