'use client'
import { useAuth } from "@/context/authcontext";
import { getTranslations, saveTranslation } from "@/helpers/dbutils";
import Link from "next/link";
import { SyntheticEvent, useEffect, useState } from "react";
import { useTranslation } from '@/i18n/client'
interface FocusEvent<T = Element> extends SyntheticEvent {
  relatedTarget: EventTarget | null;
  target: EventTarget & T;
}

interface KeyboardEvent<T = Element> extends SyntheticEvent {
  relatedTarget: EventTarget | null;
  target: EventTarget & T;
}

const TranslationsAdmin = ({ params: { lang } }: { params: { lang: string } }) => {
  /* eslint-disable react-hooks/rules-of-hooks */
  const { t } = useTranslation(lang, 'dashboard')
  const { isAdmin, isTrans } = useAuth()
  const [dbTranslations, setDbTranslations] = useState(null)
  const namespaces = ["dashboard", "faq", "home", "leaderboard", "stats", "translations"];

  let translationChains: any = { }
  namespaces.map((ns) => {
    let english = require(`@/i18n/locales/en/${ns}.json`)
    let french = require(`@/i18n/locales/fr/${ns}.json`)
    Object.assign(translationChains, { [ns]: {en: english, fr: french}});
  })

  const handleKeyUp = (event: KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.target.defaultValue !== event.target.value) {
      event.target.classList.add("bg-amber-50")
    } else {
      event.target.classList.remove("bg-amber-50")
    }
  }

  const handleSaveOnBlur = async (e: FocusEvent<HTMLTextAreaElement>) => {
    if (e.target.defaultValue !== e.target.value) {
      const res = await saveTranslation(e.target.getAttribute('data-namespace'), e.target.name, "fr",  e.target.value)
      // TODO why do we not get response object?
        e.target.classList.remove("bg-amber-50")
    }
  }

  useEffect(() => {
    const fetchDbTrans = async () => {
      const trans = await getTranslations()
      setDbTranslations(trans)
      
    }
    dbTranslations === null && fetchDbTrans()
  }, [dbTranslations])

  if (!isTrans) return <></>

  return (
  <div className="bg-white rounded-lg border border-blue-200 text-left text-blue-900 p-2 m-2 sm:p-4 sm:m-4">
    <div className="text-stone-600 text-sm">
      {isAdmin && <Link href="/dashboard/admin" >{t('admin-page')}</Link>} | 
      {isAdmin && <Link href="/dashboard/translations/jsonfiles" >Translation json</Link>}
      <h2>{t('Translations')}</h2>
      {namespaces.map((ns) => (
        <div key={ns}>
          <h3>{ns}</h3>
          {Object.keys(translationChains[ns].en).map( key => {
            /* @ts-ignore */
            let dbValue = dbTranslations && (dbTranslations?.find((row) => row.key === key)?.fr) || ""
            return (
            <div key={key}>
              <div className="pb-1 align-top pt-5 w-full">
                <span className="text-xs text-zinc-300">{key}</span><br/>
                <span className="font-bold w-full">{translationChains[ns].en[key]}</span>
              </div>
              <div className="float-left align-top pb-4 w-full">
              <textarea 
                name={key} rows={2} data-namespace={ns}
                className="border border-solid border-emerald-950 w-full"
                defaultValue={translationChains[ns].fr[key] || dbValue} 
                onBlur={handleSaveOnBlur}
                /* @ts-ignore */
                onKeyUp={handleKeyUp}
              />
                {/* <input name={key} type="text" className="form-input" value={translationChains[ns].fr[key] || dbValue} /> */}
              </div>
            </div>
          )})}
        </div>
      ))}
    </div>
  </div>
  )

}

export default TranslationsAdmin;
