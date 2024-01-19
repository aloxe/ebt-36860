import { ScoreCard } from "@/components/common/scoreCard";
import { formatDate } from "@/helpers/time";
import { useTranslation } from '@/i18n'

interface SummaryProps {
  lang: string
  user: User
  count: any
  date?: Date
  className: string
}

async function Summary({ lang, user, count, date, className }: SummaryProps) {
  /* eslint-disable react-hooks/rules-of-hooks */
  const { t } = await useTranslation(lang, 'stats')
  const { username } = user;
  
  return (
    <>
      <div className={`${className} bg-white rounded-lg border border-blue-200 text-left p-2 m-2 sm:p-4 sm:m-4`}>
        <div className="sm:flex sm:justify-between">
          <h2>
            {t('user-in-France', {"username": username})}
          </h2>
          <div className={`text-right text-stone-400 text-sm ${className && "md:h-[88px] md:min-h-full"}`}>
          {/* hack to push down score cards */}
            {t("last-updated")}: <span className="whitespace-nowrap">{formatDate(lang, 'LLL', date)}</span>
          </div>
        </div>
        <div className="flex flex-wrap justify-around mt-2">
          <ScoreCard icon="📍" score={count.all} label={t("location", {count: count.all})} lang={lang} />
          <ScoreCard icon="🏘️" score={count.communes} label={t("municipality", {count: count.communes})} lang={lang} />
          <ScoreCard icon="🇫🇷" score={count.departements} label={t("district", {count: count.departements})} lang={lang} />
          <ScoreCard icon="🏛️" score={count.prefectures} label={t("hq", {count: count.prefectures})} lang={lang} />
        </div>
      </div>
    </>
  )
}

export default Summary;
