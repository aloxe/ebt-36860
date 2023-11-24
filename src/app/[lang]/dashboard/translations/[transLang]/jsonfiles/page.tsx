'use client'
import { useAuth } from "@/context/authcontext";
import { getTranslations } from "@/helpers/dbutils";
import { SyntheticEvent, useEffect, useState } from "react";
import { useTranslation } from '@/i18n/client'
import AdminLinks from "@/components/common/adminLinks";

interface MouseEvent<T = Element> extends SyntheticEvent {
  relatedTarget: EventTarget | null;
  target: EventTarget & T;
}

const JsonTranslations = ({ params }: { params: { lang: string, transLang: string } }) => {
  /* eslint-disable react-hooks/rules-of-hooks */
  // const { t } = useTranslation(lang, 'dashboard')
  const { isTrans, isAdmin } = useAuth()
  const [langTranslations, setLangTranslations] = useState(null)
  const [dbTranslations, setDbTranslations] = useState(null)
  const namespaces = ["dashboard", "faq", "home", "leaderboard", "stats", "translations"];
  const { lang, transLang } = params;

  let translationChains: any = { }
  namespaces.map((ns) => {
    let english = require(`@/i18n/locales/en/${ns}.json`)
    let nextLang = require(`@/i18n/locales/${transLang}/${ns}.json`)
    Object.assign(translationChains, { [ns]: {en: english, [transLang]: nextLang}});
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
        let dbValue = dbTranslations && (dbTranslations?.find((row) => row.key === key)?.[transLang]) || translationChains[ns][transLang][key] || ""
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

  if (!isAdmin && !isTrans) return <></>

  return (
  <div className="bg-white rounded-lg border border-blue-200 text-left text-blue-900 p-2 m-2 sm:p-4 sm:m-4">
    <div className="text-stone-600 text-sm">
      <AdminLinks lang={lang} />
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
