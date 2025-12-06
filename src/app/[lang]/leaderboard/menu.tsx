import {Fragment} from 'react';
import { useTranslation } from '@/i18n'
import Link from "next/link";

const LeaderMenu = async ({ lang, slug }: { lang: string, slug: string}) => {
  /* eslint-disable react-hooks/rules-of-hooks */
  const { t } = await useTranslation(lang, 'leaderboard');
  const rubrique = ["population", "surface", "altitude"];
  return (
    <div className="text-center text-xs sm:text-sm">
      <>{slug === "municipalities" ? <b>{t("municipalities")}</b> : <Link href={`/leaderboard/`}>{t("municipalities")}</Link>} · </>
      {rubrique.map(r => {
        return <Fragment key={r}>{r === slug ? <b>{t(r)}</b> : <Link href={`/leaderboard/${r}`}>{t(r)}</Link>} · </Fragment>
      })}
    </div>
  )
}

export default LeaderMenu