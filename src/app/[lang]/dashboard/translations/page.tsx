'use client'

import { getTranslations } from "@/helpers/dbutils";
import { useEffect, useState } from "react";



 const TranslationsAdmin = () => {
  const namespaces = ["dashboard", "faq", "home", "leaderboard", "stats", "translations"];
  const [dbTranslations, setDbTranslations] = useState(null)

  let translationChains:any = { }
  namespaces.map((ns) => {
    console.log(ns);
    let english = require(`@/i18n/locales/en/${ns}.json`)
    let french = require(`@/i18n/locales/fr/${ns}.json`)
    // translationChains.push({ [ns]: {en: [english]} })
    Object.assign(translationChains, { [ns]: {en: english, fr: french}});
    // translationChains.push({ [ns]: {fr: french} })
    // Object.assign(translationChains, { [ns]: {fr: french} });
  })
  // const translationKeys = Object.keys(translationChains.dashboard.en)

  console.log(translationChains);
  
  // const getFrTranslation = (key: string) => {
  //   return translationChains.dashboard.fr[key]
  //   // return dbTranslations && dbTranslations.find((row) => row.key === key) ;
  // }

  useEffect(() => {
    const fetchDbTrans = async () => {
      const trans = await getTranslations()
      setDbTranslations(trans)
      console.log("trans", trans);
      
    }
    dbTranslations === null && fetchDbTrans()
  }, [dbTranslations])

  return (
    <div className="bg-white rounded-lg border border-blue-200 text-left text-blue-900 p-2 m-2 sm:p-4 sm:m-4">
    <div className="text-stone-600 text-sm">
      <h2>Translations</h2>
      {namespaces.map((ns) => (
        <>
          <h3>{ns}</h3>
          {Object.keys(translationChains[ns].en).map( key => {
            /* @ts-ignore */
            let dbValue = dbTranslations && (dbTranslations?.find((row) => row.key === key)?.fr) || ""
            return (
            <>
            <div>
              <div className="pb-1 align-top pt-5 w-full">
                <span className="text-xs text-zinc-300">{key}</span><br/>
                <span className="font-bold w-full">{translationChains[ns].en[key]}</span>
              </div>
              <div className="float-left align-top pb-4 w-full">
              <textarea className="border border-solid border-emerald-950 w-full"
              name={key} rows={2} value={translationChains[ns].fr[key] || dbValue} />
                {/* <input name={key} type="text" className="form-input" value={translationChains[ns].fr[key] || dbValue} /> */}
              </div>
            </div>
            </>
          )})}
        </>
      ))}
    </div>
  </div>
  )

}

export default TranslationsAdmin;
