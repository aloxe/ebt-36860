'use client'
import Link from "next/link";
import { useTranslation } from '@/i18n/client'

const StatsMenu = ({ lang, id }: {lang: string, id: string }) => {
  /* eslint-disable react-hooks/rules-of-hooks */
  const { t } = useTranslation(lang, 'stats')

  return (
    <nav className="flex place-items-center justify-around sm:flex-row  p-2 m-0 sm:p-4 md:text-md sm:text-sm text-xs">
      <Link href={`/${lang}/leaderboard`}>⮐</Link>
      <Link href={`/${lang}/stats/${id}/36680-communes`}>36680</Link>
      <Link href={`/${lang}/stats/${id}/liste-communes`}>{t("list")}</Link>
      <Link href={`/${lang}/stats/${id}/carte-de-france`}>{t("map")}</Link>
      <Link href={`/${lang}/stats/${id}/tour-de-france`}>tour de France</Link>
      <Link href={`/${lang}/stats/${id}/prefectures`}>{t("hq", {count: 2})}</Link>
    </nav>
  )
}

export default StatsMenu