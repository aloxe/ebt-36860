import { useTranslation } from '@/i18n'
import Link from "next/link";

const LeaderMenu = async ({ lang }: { lang: string}) => {
  /* eslint-disable react-hooks/rules-of-hooks */
  const { t } = await useTranslation(lang, 'leaderboard')
  
  return (
  <div className="text-center">
    <Link href="/leaderboard/">{t("municipalities")}</Link> · 
    <Link href="/leaderboard/population">{t("population")}</Link> · 
    <Link href="/leaderboard/surface">{t("surface")}</Link> · 
    <Link href="/leaderboard/altitude">{t("altitude")}</Link>
  </div>
  )
}

export default LeaderMenu