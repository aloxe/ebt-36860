import { createInstance } from 'i18next'
import resourcesToBackend from 'i18next-resources-to-backend'
import { initReactI18next } from 'react-i18next/initReactI18next'
import { getLgOptions } from '@/i18n/settings'

const initI18next = async (lng, ns) => {
  const i18nInstance = createInstance()
console.log("INIT initI18next ==================== ================", lng, ns);
console.log(i18nInstance);

    await i18nInstance
        .use(initReactI18next)
        .use(resourcesToBackend((language, namespace) => import(`./locales/${language}/${namespace}.json`)))
        .init(getLgOptions(lng, ns))
    return i18nInstance
}

export async function useTranslation(lng, ns, options = {}) {
  const i18nextInstance = await initI18next(lng, ns)
  console.log("INIT i18nextInstance ==================== ================", lng, ns);
  console.log(Array.isArray(ns) ? ns[0] : ns);
  return {
    t: i18nextInstance.getFixedT(lng, Array.isArray(ns) ? ns[0] : ns, options.keyPrefix),
    i18n: i18nextInstance
  }
}
