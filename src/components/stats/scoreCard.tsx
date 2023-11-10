import { useTranslation } from '@/i18n'

export async function ScoreCard({lang, icon = "▥", score, label}:{lang?: string | undefined, icon: string, score: number | undefined, label: string}) {
  /* eslint-disable react-hooks/rules-of-hooks */
  const { t } = await useTranslation(lang, 'stats')
 
  return (
          <div className="text-center text-lg font-bold leading-5 bg-white rounded-lg border border-blue-900 p-1 w-24 min-w-min m-2">
            {icon}<br/>
            {score ? score : "‽"}<br/>
            <span className="text-xs sm:text-sm font-normal m-0">
              {t(label, {count: score})}
            </span>
          </div>
      );
    }
