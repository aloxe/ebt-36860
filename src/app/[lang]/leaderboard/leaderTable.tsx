import Spinner from "@/components/common/spinner";
import { formatDate, getUserFlag } from "@/helpers/strings";
import { useTranslation } from '@/i18n'

const LeaderTable = async ({ players, lang }: {players: DbUser[], lang: string}) => {

  /* eslint-disable react-hooks/rules-of-hooks */
  const { t } = await useTranslation(lang, 'leaderboard')

  return (
    <table className="min-w-full text-left text-md font-light">
      <thead className="border-b font-medium dark:border-neutral-500">
        <tr className="bg-sky-200">
          <th className="px-3 md:px-6 py-2 hidden sm:table-cell">{t("rank")}</th>
          <th className="px-3 md:px-6 py-2">{t("name")}</th>
          <th className="px-3 md:px-6 py-2">{t("score")}</th>
          {/* <th className="whitespace-nowrap px-6 py-4">map</th> */}
        </tr>
      </thead>
      <tbody>
        {!players &&
        <tr><td><Spinner /></td></tr>
        }
        {players && players.map( async (p, index) => (
        <tr className={`bg-slate-100 border-b dark:border-neutral-500 text-md ${!!p.country ? " hover:bg-amber-50" : "opacity-70 border-stone-800"}`}
        key={p.user_id}>

          <td className="hidden sm:table-cell">
            <a href={!!p.country ? `/${lang}/stats/${p.user_id}` : undefined} className={`fill-cell ${!!p.country && "cursor-pointer"}`}>
              { index + 1 }
            </a>
          </td>
          <td className="h-full">
            <a href={!!p.country ? `/${lang}/stats/${p.user_id}` : undefined}
            className={`fill-cell ${!!p.country && "text-blue-900 underline cursor-pointer"}`}>

            {!!p.country && <>{await getUserFlag(p.country)} {p.username}</>}
            {/* @ts-ignore */}
            {!p.country && <>{p.flag} {p.username}</>}
            </a>
          </td>
          <td className="h-full">
            <a href={!!p.country ? `/${lang}/stats/${p.user_id}` : undefined} className={`fill-cell ${!!p.country && "cursor-pointer"} sm:flex sm:justify-between`}>
              {p.score}
              <div className="text-right text-xs whitespace-nowrap truncate">
                {!!p.country && formatDate(p.content ? JSON.parse(p.content).date : p.date)}
                {!p.country && !!p.date && (<i>{formatDate(p.date)}</i>)}
              </div>
            </a>
          </td>
          {/* <td className="whitespace-nowrap px-6 py-4 w-2">carte</td> */}
          {/* </a> */}
        </tr>
        ))}
      </tbody>
    </table>
  )
}

export default LeaderTable
