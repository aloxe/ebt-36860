import { ScoreCard } from "@/components/common/scoreCard";
import { useTranslation } from '@/i18n'
import moment from "moment";
import 'moment/min/locales';

async function Summary({ lang, user, visited, className }: DetailsProps) {
  /* eslint-disable react-hooks/rules-of-hooks */
  const { t } = await useTranslation(lang, 'stats')
  const { username } = user;
  moment.locale(lang === 'en' ? 'en-gb' : lang);

  return (
    <>
      <div className={`${className} bg-white rounded-lg border border-blue-200 text-left p-2 m-2 sm:p-4 sm:m-4`}>
        <div className="sm:flex sm:justify-between">
          <h2>
            {t('user-in-France', {"username": username})}
          </h2>
          <div className={`text-right text-stone-400 text-sm ${className && "md:h-[88px] md:min-h-full"}`}>
          {/* hack to push down score cards */}
            {t("last-updated")}: <span className="whitespace-nowrap">{moment(visited.date).format('LLL')}</span>
          </div>
        </div>
        <div className="flex flex-wrap justify-around mt-2">
          <ScoreCard icon="📍" score={visited?.visitedCities?.length} label={t("location", {count: visited?.visitedCities?.length})} lang={lang} />
          <ScoreCard icon="🏘️" score={visited?.communes?.length} label={t("municipality", {count: visited?.communes?.length})} lang={lang} />
          <ScoreCard icon="🇫🇷" score={visited?.departements?.length} label={t("district", {count: visited?.departements?.length})} lang={lang} />
          <ScoreCard icon="🏛️" score={visited?.prefectures?.length} label={t("hq", {count: visited?.prefectures?.length})} lang={lang} />
        </div>
      </div>
    </>
  )
}

export default Summary;
