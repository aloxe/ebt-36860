import Profile from "@/components/stats/profile";
import StatsHeader from "./header";
import StatsMenu from "./menu";
import { getCountsServer } from "@/helpers/dbutils";
import { getPublicUser } from "@/helpers/ebtutils";

const UserData = async ({ params }: { params: { lang: string, id: string } }) => {
  const { lang, id } = params;
  const publicUser = await getPublicUser(id);
  const counts = await getCountsServer(id, "date,communes,departements,prefectures,count");

  return (
    <>
      <div className="md:table border-spacing-x-4">
        <StatsHeader lang={lang} id={id} user={publicUser} date={counts ? counts.date : undefined} count={counts ? JSON.parse(counts.count) : undefined} />
      </div>
      <StatsMenu lang={lang} id={id} />
    </>
  )
}

export default UserData
