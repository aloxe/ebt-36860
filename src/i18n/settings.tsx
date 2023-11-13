export const fallbackLng = 'en'
export const languages = [fallbackLng, 'fr', 'cs']
export const defaultNS = 'translations'

export function getLgOptions (lng = fallbackLng, ns = defaultNS) {
  return {
    debug: false,
    supportedLngs: languages,
    fallbackLng,
    lng,
    fallbackNS: defaultNS,
    defaultNS,
    ns
  }
}

