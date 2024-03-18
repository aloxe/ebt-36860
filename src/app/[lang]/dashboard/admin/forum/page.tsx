import { getAllPlayers } from "@/helpers/leaderutils";
import Resultats from "./resultats";
import { fetchAllComplete } from "@/helpers/cityutils";
import AdminLinks from "@/components/common/adminLinks";

// https://nextjs.org/docs/app/api-reference/file-conventions/route-segment-config
export const revalidate = 600

const Forum = async ({ params: { lang } }: { params: { lang: string } }) => {
  const players = await getAllPlayers()

  const allCommunesWithDomTom: Commune[] = await fetchAllComplete();
  const allCommunes = allCommunesWithDomTom.filter(el => el.zone === "metro")

  return (
    <>
    <AdminLinks lang={lang} />
    <div className="bg-white rounded-lg border border-blue-200 text-left text-blue-900 p-2 m-2 sm:p-4 sm:m-4">
      <div className="text-stone-600 text-sm">
        {allCommunes && <Resultats players={players} lang={lang} allCommunes={allCommunes} />}
      </div>
    </div>
    </>
  )
}

export default Forum