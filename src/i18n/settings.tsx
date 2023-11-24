export const fallbackLng = 'en'
export const languages = [fallbackLng, 'fr']
export const defaultNS = 'translations'

export function getLgOptions (lng = fallbackLng, ns = defaultNS) {
  return {
    debug: false,
    supportedLngs: languages,
    interpolation: { escapeValue: false },
    fallbackLng,
    lng,
    fallbackNS: defaultNS,
    defaultNS,
    ns
  }
}