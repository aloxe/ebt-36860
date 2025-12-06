'use client'
import { useAuth } from "@/context/authcontext";
import { getTranslations, saveTranslation } from "@/helpers/dbutils";
import { SyntheticEvent, useEffect, useState } from "react";
import { useTranslation } from '@/i18n/client'
import AdminLinks from "@/components/common/adminLinks";
import TransMenu from "../transMenu";
import JsonTranslations from "../jsonTranslations";
interface FocusEvent<T = Element> extends SyntheticEvent {
  relatedTarget: EventTarget | null;
  target: EventTarget & T;
}

interface KeyboardEvent<T = Element> extends SyntheticEvent {
  relatedTarget: EventTarget | null;
  target: EventTarget & T;
}

const TranslationsAdmin = ({ params }: { params: { lang: string, transLang: string, ns: string } }) => {
  const { lang, transLang, ns } = params;
  /* eslint-disable react-hooks/rules-of-hooks */
  const { t } = useTranslation(lang, 'dashboard')
  const { isTrans, isAdmin } = useAuth()
  const [dbTranslations, setDbTranslations] = useState(null)
  const namespaces = ["dashboard", "faq", "home", "leaderboard", "stats", "translations"];

  let translationChains: any = { }
  namespaces.map((ns) => {
    let english = require(`@/i18n/locales/en/${ns}.json`)
    Object.assign(translationChains, { [ns]: {en: english}});
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
      const res = await saveTranslation(e.target.getAttribute('data-namespace'), e.target.name, transLang,  e.target.value)
      // TODO why do we not get response object?
        e.target.classList.remove("bg-amber-50")
    }
  }

  useEffect(() => {
    const fetchDbTrans = async (transLang: string, ns: string) => {
      const trans = await getTranslations(transLang, ns)
      setDbTranslations(trans)
      
    }
    dbTranslations === null && fetchDbTrans(transLang, ns)
  }, [dbTranslations])

  if (!isTrans) return <></>

  return (
    <>
    <AdminLinks lang={lang} />
    <div className="bg-white rounded-lg border border-blue-200 text-left text-blue-900 p-2 m-2 sm:p-4 sm:m-4">
    <div className="text-stone-600 text-sm">
      <h2>{t('Translations')} [en → {transLang}]</h2>
      <p>
        <TransMenu lang={lang} transLang={transLang} ns={ns} />
      </p>
        <div key={ns}>
          <h3>{ns}</h3>
          {Object.keys(translationChains[ns].en).map( key => {
            return (
            <div key={key}>
              <div className="pb-1 align-top pt-5 w-full">
                <span className="text-xs text-zinc-400">{key}</span><br/>
                <span className="font-bold w-full">{translationChains[ns].en[key]}</span>
              </div>
              <div className="float-left align-top pb-4 w-full">
              <textarea 
                name={key} rows={2} data-namespace={ns}
                className="border border-solid border-emerald-950 w-full"
                defaultValue={dbTranslations ? dbTranslations[key] : ""}
                onBlur={handleSaveOnBlur}
                /* @ts-ignore */
                onKeyUp={handleKeyUp}
              />
              </div>
            </div>
          )})}
        </div>
    </div>
  </div>
  {!isAdmin && <></>}
  {isAdmin && <JsonTranslations transLang={transLang} ns={ns} dbTranslations={dbTranslations} />}
  </>
  )

}

export default TranslationsAdmin;
