'use client'
import { useAuth } from "@/context/authcontext";
import { getTranslations } from "@/helpers/dbutils";
import Link from "next/link";
import { SyntheticEvent, useEffect, useState } from "react";
import { useTranslation } from '@/i18n/client'

interface MouseEvent<T = Element> extends SyntheticEvent {
  relatedTarget: EventTarget | null;
  target: EventTarget & T;
}

const JsonTranslations = ({ params: { lang } }: { params: { lang: string } }) => {
  /* eslint-disable react-hooks/rules-of-hooks */
  const { t } = useTranslation(lang, 'dashboard')
  const { isAdmin } = useAuth()
  const [langTranslations, setLangTranslations] = useState(null)
  const [dbTranslations, setDbTranslations] = useState(null)
  const namespaces = ["dashboard", "faq", "home", "leaderboard", "stats", "translations"];

  let translationChains: any = { }
  namespaces.map((ns) => {
    let english = require(`@/i18n/locales/en/${ns}.json`)
    let french = require(`@/i18n/locales/fr/${ns}.json`)
    Object.assign(translationChains, { [ns]: {en: english, fr: french}});
  })

  const selectAll = (event: MouseEvent<HTMLTextAreaElement>) => {
    event.target.select();
    document.execCommand('copy');
  }

  const generateLgTrans = () => {
    let lgTrans: any = {}
    namespaces.map((ns) => {
      lgTrans[ns] = {}
      Object.keys(translationChains[ns].en).map( key => {
        /* @ts-ignore */
        let dbValue = dbTranslations && (dbTranslations?.find((row) => row.key === key)?.fr) || translationChains[ns].fr[key] || ""
        if (dbValue) { lgTrans[ns][key] = dbValue }
      })
    })
    setLangTranslations(lgTrans);
  }

  useEffect(() => {
    const fetchDbTrans = async () => {
      const trans = await getTranslations()
      setDbTranslations(trans)
    }
    if (dbTranslations === null) {
      fetchDbTrans()
    } else {
      generateLgTrans()
    }
  }, [dbTranslations])

  if (!isAdmin) return <></>

  return (
  <div className="bg-white rounded-lg border border-blue-200 text-left text-blue-900 p-2 m-2 sm:p-4 sm:m-4">
    <div className="text-stone-600 text-sm">
      {isAdmin && <Link href="/dashboard/admin" >{t('admin-page')}</Link>} | 
      {isAdmin && <Link href="/dashboard/translations" >{t('translations')}</Link>}
      <h2>Translation JSON</h2>
      {langTranslations && namespaces.map((ns) => (
        <div key={ns}>
          <h3>{ns}.json</h3>
          <textarea 
            name={ns} rows={5}
            className="w-full font-mono text-xs"
            value={ JSON.stringify(langTranslations[ns], null, 2) } 
            /* @ts-ignore */
            onClick={selectAll}
          />
        </div>
      ))}
    </div>
  </div>
  )

}

export default JsonTranslations;
