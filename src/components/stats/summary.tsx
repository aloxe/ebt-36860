import { ScoreCard } from "@/components/stats/scoreCard";
import { useTranslation } from '@/i18n'

async function Summary({ lang, user, visited, className }: DetailsProps) {
  /* eslint-disable react-hooks/rules-of-hooks */
  const { t } = await useTranslation(lang, 'stats')
  const { username } = user;
    var d = new Date(visited?.date || '');
  const date = d.toLocaleString("en-GB", { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })

  return (
    <>
      <div className={`${className} bg-white rounded-lg border border-blue-200 text-left p-2 m-2 sm:p-4 sm:m-4`}>
        <div className="sm:flex sm:justify-between">
          <h2>
            {t('user-in-France', {"username": username})}
          </h2>
          <div className={`text-right text-stone-400 text-sm ${className && "md:h-[88px] md:min-h-full"}`}>
          {/* hack to push down score cards */}
            {t("last-updated")}: <span className="whitespace-nowrap">{date}</span>
          </div>
        </div>
        <div className="flex flex-wrap justify-around mt-2">
          <ScoreCard icon="📍" score={visited?.visitedCities?.length} label="location" lang={lang} />
          <ScoreCard icon="🏘️" score={visited?.communes?.length} label="municipality" lang={lang} />
          <ScoreCard icon="🇫🇷" score={visited?.departements?.length} label="district" lang={lang} />
          <ScoreCard icon="🏛️" score={visited?.prefectures?.length} label="hq" lang={lang} />
        </div>
      </div>
    </>
  )
}

export default Summary;