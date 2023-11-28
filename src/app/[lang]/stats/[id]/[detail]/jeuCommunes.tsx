import JeuCommunes from "@/components/common/jeuCommunes";
import { fetchAllComplete } from "@/helpers/cityutils";
import { useTranslation } from '@/i18n'

interface StatJeuCommunesProps {
  lang: string
  user: User
  communes: string[]
}

async function StatJeuCommunes({lang, user, communes}: StatJeuCommunesProps) {
    /* eslint-disable react-hooks/rules-of-hooks */
    const { t } = await useTranslation(lang, 'stats')

  const allCommunesWithDomTom: Commune[] = await fetchAllComplete();
  // we remove oversea municipalities
  const allCommunes = allCommunesWithDomTom.filter(el => el.zone === "metro")

  const inseeAltitude = require('@/data/correspondance-code-insee-altitude-2013.json')
  const visitedCommunes = allCommunes.filter(c => communes.includes(c.code) ).map(c => ({
    code: c.code, 
    nom: c.nom, 
    population: c.population || 0,
    surface: c.surface ? c.surface / 100 : 0,
    // @ts-ignore
    altitude: parseInt(inseeAltitude.find(el => el.code === c.code)?.altitude),
  }))

  const username = user.username ?? "⸘";

  return (
    <JeuCommunes lang={lang} t={t} username={username} allCommunes={allCommunes} visitedCommunes={visitedCommunes} />
  )
}

export default StatJeuCommunes;