import { getAllPlayersSorted } from "@/helpers/leaderutils";
import LeaderTable from "./../leaderTable";
import { useTranslation } from '@/i18n'
import LeaderMenu from "../menu";

// https://nextjs.org/docs/app/api-reference/file-conventions/route-segment-config
export const revalidate = 600

export const SLUG = {
  score: "municipalities",
  pop: "population",
  surf: "surface",
  alt: "altitude"
}

const LeaderAlt = async ({ params: { lang, slug } }: { params: { lang: string, slug: string }}) => {
  /* eslint-disable react-hooks/rules-of-hooks */
  const { t } = await useTranslation(lang, 'leaderboard')

  const type = Object.keys(SLUG).filter(k => (SLUG as any)[k] === slug).toString()

  const players = await getAllPlayersSorted(type)

  return (
  <div className="bg-white rounded-lg border border-blue-200 text-left text-blue-900 p-2 m-2 sm:p-4 sm:m-4">
    <LeaderMenu lang={lang} slug={slug} />
    <div className="text-stone-600 text-sm">
      <h2>{t("leaderboard")}</h2>
      <LeaderTable players={players} lang={lang} type={type} />
    </div>
  </div>
  )
}

export default LeaderAlt