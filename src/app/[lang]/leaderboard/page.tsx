import { getAllPlayersSorted } from "@/helpers/leaderutils";
import LeaderTable from "./leaderTable";
import { useTranslation } from '@/i18n'
import LeaderMenu from "./menu";

// https://nextjs.org/docs/app/api-reference/file-conventions/route-segment-config
export const revalidate = 600

const LeaderBoard = async ({ params: { lang } }: { params: { lang: string}}) => {
  /* eslint-disable react-hooks/rules-of-hooks */
  const { t } = await useTranslation(lang, 'leaderboard')
  const players = await getAllPlayersSorted("score")
  
  return (
  <div className="bg-white rounded-lg border border-blue-200 text-left text-blue-900 p-2 m-2 sm:p-4 sm:m-4">
    <LeaderMenu lang={lang} slug="municipalities" />
    <div className="text-stone-600 text-sm">
      <h2>{t("leaderboard")}</h2>
      <LeaderTable players={players} lang={lang} type="score"/>
    </div>
  </div>
  )
}

export default LeaderBoard
