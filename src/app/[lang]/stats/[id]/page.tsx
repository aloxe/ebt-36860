import { use } from 'react';
import StatsHeader from "./header";
import StatsMenu from "./menu";
import { getCountsServer } from "@/helpers/dbutils";
import { getPublicUser } from "@/helpers/ebtutils";

type Params = Promise<{ lang: string, id: string }>

const UserData = async ({ params }: { params: Params }) => {
  const { lang, id } = use(params); 
  const publicUser = await getPublicUser(id);
  const counts = await getCountsServer(id, "date,communes,departements,prefectures,count");

  return (
    <>
      <StatsHeader lang={lang} id={id} user={publicUser} date={counts ? counts.date : undefined} count={counts ? JSON.parse(counts.count) : undefined} />
      <StatsMenu lang={lang} id={id} />
    </>
  )
}

export default UserData
