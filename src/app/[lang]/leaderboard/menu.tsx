import { useTranslation } from '@/i18n'
import Link from "next/link";

const LeaderMenu = async ({ lang, slug }: { lang: string, slug: string}) => {
  /* eslint-disable react-hooks/rules-of-hooks */
  const { t } = await useTranslation(lang, 'leaderboard');
  const rubrique = ["population", "surface", "altitude"];
  return (
    <div className="text-center">
      <>{slug === "municipalities" ? <b>{slug}</b> : <Link href={`/leaderboard/`}>{t("municipalities")}</Link>} · </>
      {rubrique.map(r => {
        return <>{r === slug ? <b>{slug}</b> : <Link href={`/leaderboard/${r}`}>{t(r)}</Link>} · </>
      })}
    </div>
  )
}

export default LeaderMenu