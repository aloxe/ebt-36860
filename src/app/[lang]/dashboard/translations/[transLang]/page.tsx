'use client'
import { useAuth } from "@/context/authcontext";
import { getTranslations, saveTranslation } from "@/helpers/dbutils";
import { SyntheticEvent, useEffect, useState } from "react";
import { useTranslation } from '@/i18n/client'
import AdminLinks from "@/components/common/adminLinks";
import TransMenu from "./transMenu";
interface FocusEvent<T = Element> extends SyntheticEvent {
  relatedTarget: EventTarget | null;
  target: EventTarget & T;
}

interface KeyboardEvent<T = Element> extends SyntheticEvent {
  relatedTarget: EventTarget | null;
  target: EventTarget & T;
}

const TranslationsAdmin = ({ params }: { params: { lang: string, transLang: string } }) => {
  const { lang, transLang } = params;
  /* eslint-disable react-hooks/rules-of-hooks */
  const { t } = useTranslation(lang, 'dashboard')
  const { isTrans } = useAuth()
  const [dbTranslations, setDbTranslations] = useState(null)
  const namespaces = ["dashboard", "faq", "home", "leaderboard", "stats", "translations"];

  // get all translation strings from english json files
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

  // load all translations for transLang from db
  useEffect(() => {
    const fetchDbTrans = async (transLang: string) => {
      const trans = await getTranslations(transLang)
      setDbTranslations(trans)
      
    }
    dbTranslations === null && fetchDbTrans(transLang)
  }, [dbTranslations])

  if (!isTrans) return <></>

  return (
  <>
  <AdminLinks lang={lang} />
  <div className="bg-white rounded-lg border border-blue-200 text-left text-blue-900 p-2 m-2 sm:p-4 sm:m-4">
    <div className="text-stone-600 text-sm">
      <h2>{t('Translations')} [en → {transLang}]</h2>
      <p className="text-xs">All strings to translate are gathered on this page and sorted by categories. Please add words in the <em>&#123;&#123;&#125;&#125;</em> and in <em>t()</em> without translating them as this should be done dynamically. Words in <em>t()</em> are usually words that may be in sigular or in plural depending on the context, You may have to translate both version in a following field.</p>
      <p>
        <br/>
        <TransMenu lang={lang} transLang={transLang} />
      </p>
      {namespaces.map( ns => (
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
      ))}
    </div>
  </div>
  </>
  )

}

export default TranslationsAdmin;
