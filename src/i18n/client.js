'use client'

import { useEffect, useState } from 'react'
import i18next from 'i18next'
import { initReactI18next, useTranslation as useTranslationOrg } from 'react-i18next'
import { useCookies } from 'react-cookie'
import resourcesToBackend from 'i18next-resources-to-backend'
import LanguageDetector from 'i18next-browser-languagedetector'
import { getLgOptions, languages } from '@/i18n/settings'

const runsOnServerSide = typeof window === 'undefined'

// 
i18next
  .use(initReactI18next)
  .use(LanguageDetector)
  .use(resourcesToBackend((language, namespace) => import(`./locales/${language}/${namespace}.json`)))
  .init({
    // TODO use https://github.com/i18next/i18next-chained-backend 
    // with DB translations
    ...getLgOptions(),
    lng: undefined, // let detect the language on client side
    detection: {
      order: ['path', 'htmlTag', 'cookie', 'navigator'],
    },
    preload: runsOnServerSide ? languages : []
  })

export function useTranslation(lng, ns, options) {
  const [cookies, setCookie] = useCookies(['i18next'])
  const ret = useTranslationOrg(ns, options)
  const { i18n } = ret
  if (runsOnServerSide && lng && i18n.resolvedLanguage !== lng) {
    i18n.changeLanguage(lng)
  } else {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [activelang, setActivelang] = useState(i18n.resolvedLanguage)

    // eslint-disable-next-line react-hooks/rules-of-hooks
    useEffect(() => {
      if (activelang === i18n.resolvedLanguage) return
      setActivelang(i18n.resolvedLanguage)
    }, [activelang, i18n.resolvedLanguage] )

    // eslint-disable-next-line react-hooks/rules-of-hooks
    useEffect(() => {
      if (!lng || i18n.resolvedLanguage === lng) return
      i18n.changeLanguage(lng)
    }, [lng, i18n])

    // eslint-disable-next-line react-hooks/rules-of-hooks
    useEffect(() => {
      if (cookies.i18next === lng) return
      setCookie('i18next', lng, { path: '/' })
    }, [lng, cookies.i18next, setCookie])
  }
  return ret
}
