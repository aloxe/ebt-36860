export const fallbackLang = 'en'
export const languages = [fallbackLang, 'fr', 'cs']
export const defaultNS = 'translations'

export function getLgOptions (lng = fallbackLang, ns = defaultNS) {
  return {
    // debug: true,
    supportedLngs: languages,
    fallbackLang,
    lng,
    fallbackNS: defaultNS,
    defaultNS,
    ns
  }
}

