import Spinner from "@/components/common/spinner";
import { useTranslation } from '@/i18n'
import { formatDate } from '@/helpers/time'

export const UNIT = {
  score: "",
  pop: "hab.",
  surf: "km²",
  alt: "m."
}

export const ICON = {
  score: "🏘",
  pop: "👥",
  surf: "📐",
  alt: "⛰️"
}

const LeaderTable = async ({ players, lang, type }: {players: User[], lang: string, type: string}) => {

  /* eslint-disable react-hooks/rules-of-hooks */
  const { t } = await useTranslation(lang, 'leaderboard')
  const isMain = type === "score"

  return (
    <>
    <table className="min-w-full text-left text-md font-light">
      <thead className="border-b font-medium dark:border-neutral-500">
        <tr className="bg-sky-200">
          <th className="px-3 md:px-6 py-2 hidden sm:table-cell">{t("rank")}</th>
          <th className="px-3 md:px-6 py-2">{t("name")}</th>
          <th className="px-3 md:px-6 py-2">{t(type)}</th>
          <th className="px-3 md:px-6 py-2 hidden sm:table-cell">{isMain && t("data")}</th>
          {/* <th className="whitespace-nowrap px-6 py-4">map</th> */}
        </tr>
      </thead>
      <tbody>
        {!players &&
        <tr><td><Spinner /></td></tr>
        }
        {players && players.map( (p, index) => (
        <tr className={`bg-slate-100 border-b dark:border-neutral-500 text-md ${p.count ? " hover:bg-amber-50" : "opacity-60 border-stone-800"}`}
        key={p.id}>

          <td className="hidden sm:table-cell">
            <a href={p.count ? `/${lang}/stats/${p.id}` : undefined} className={`fill-cell ${p.count && "cursor-pointer"}`}>
              { index + 1 }
            </a>
          </td>
          <td className="h-full">
            <a href={p.count ? `/${lang}/stats/${p.id}` : undefined}
            className={`fill-cell ${p.count && "text-blue-900 underline cursor-pointer"}`}>

            {<>{p.my_flag} {p.username}</>}
            </a>
          </td>
          <td className="h-full">
            <a href={p.count ? `/${lang}/stats/${p.id}` : undefined} className={`fill-cell ${p.count && "cursor-pointer"} sm:flex sm:justify-between`}>
            {(ICON as any)[type]} {(p as any)[type] && Intl.NumberFormat(lang, {maximumFractionDigits: 0}).format((p as any)[type]) || "‒"} {t((UNIT as any)[type])}
            <div className="text-right text-xs whitespace-nowrap truncate">
              {!!p.date && (<i>{formatDate(lang, "LL", p.date)}</i>)}
            </div>
            </a>

          </td>
          <td className="h-full">
            {isMain && <a href={p.count ? `/${lang}/stats/${p.id}` : undefined} className={`fill-cell py-0 ${p.count && "cursor-pointer"} sm:flex sm:justify-between hidden sm:table-cell`}>
              {p.pop && <>👥: {Intl.NumberFormat(lang).format(p.pop)} ha.</>}<br/>
              {p.surf && <>📐: {Intl.NumberFormat(lang, {maximumFractionDigits: 0}).format(p.surf)} km²</>}<br/>
              {p.alt && <>⛰️: {Intl.NumberFormat(lang, {maximumFractionDigits: 0}).format(p.alt)} m.</>}
            </a>}
          </td>
          {/* <td className="whitespace-nowrap px-6 py-4 w-2">carte</td> */}
          {/* </a> */}
        </tr>
        ))}
      </tbody>
    </table>
    </>
  )
}

export default LeaderTable
