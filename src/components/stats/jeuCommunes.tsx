import { fetchAllComplete } from "@/helpers/cityutils";
import { useTranslation } from '@/i18n'

async function JeuCommunes({lang, user, visited}: DetailsProps) {
    /* eslint-disable react-hooks/rules-of-hooks */
    const { t } = await useTranslation(lang, 'stats')

  const allCommunesWithDomTom: Commune[] = await fetchAllComplete();
  // we remove oversea municipalities
  const allCommunes = allCommunesWithDomTom.filter(el => el.zone === "metro")
  const firstPourcent = visited.communes.length * 100 / allCommunes.length;

  const inseeAltitude = require('@/data/correspondance-code-insee-altitude-2013.json')
  const visitedCommunes = allCommunes.filter(c => visited.communes.includes(c.code) ).map(c => ({
    code: c.code, 
    nom: c.nom, 
    population: c.population || 0,
    surface: c.surface ? c.surface / 100 : 0,
    // @ts-ignore
    altitude: parseInt(inseeAltitude.find(el => el.code === c.code)?.altitude),
  }))

  const allCommunesPop: number[] = allCommunes.map(el => el.population || 0)
  const allPop = allCommunesPop.reduce((buf, a) => buf + a)
  const visitedCommunesPop: number[] = visitedCommunes.map(el => el.population || 0)
  const visitedPop = visitedCommunesPop.reduce((buf, a) => buf + a) || 0
  const secondPourcent = visitedPop * 100 / allPop;

  const allCommunesSurf: number[] = allCommunes.map(el => el.surface || 0)
  const allSurface = allCommunesSurf.reduce((a, b) => a + b) / 100
  const visitedCommunesSurf: number[] = visitedCommunes.map(el => el.surface || 0)
  const visitedSurf = visitedCommunesSurf.reduce((a, b) => a + b)
  const thirdPourcent = visitedSurf * 100 / allSurface;

  const visitedAlt = visitedCommunes.filter(c => c.altitude)
  const visitedAltMoyenne = (visitedAlt.reduce((a, b) => a + b.altitude, 0)) / visitedAlt.length

  const maxPop = visitedCommunes.reduce((prev, current) => {
    return (prev && prev.population > current.population) ? prev : current
})
const minPop = visitedCommunes.reduce((prev, current) => {
    return (prev && prev.population < current.population) ? prev : current
})
const maxSurf = visitedCommunes.reduce((prev, current) => {
    return (prev && prev.surface > current.surface) ? prev : current
})
const minSurf = visitedCommunes.reduce((prev, current) => {
    return (prev && prev.surface < current.surface) ? prev : current
})
const maxAlt = visitedCommunes.reduce((prev, current) => {
    return (prev && prev.altitude > current.altitude) ? prev : current
})
const minAlt = visitedCommunes.reduce((prev, current) => {
    return (prev && prev.altitude < current.altitude) ? prev : current
})

const { username } = user;
  return (
    <>
      <div className="bg-white rounded-lg border border-blue-200 text-left text-black p-2 m-2 sm:p-4 sm:m-4">
        <div className="flex justify-between">
          <h2>
            {t('36680-update', {"username": username})} <span className="whitespace-nowrap">▤ 36680 communes ▥</span>
          </h2>
        </div>
        <div className="text-left text-lg font-bold mb-4">
          <span className="text-blue-600">{visited.communes.length}</span> {t('municipality', {count: visited.communes.length})} {t('that-is')} <span className="text-blue-600">{firstPourcent.toFixed(2)}%</span> {t('of-the-total-municipalities')}<br />
          <span className="text-red-600">{Intl.NumberFormat(lang).format(visitedPop)}</span> {t('inhabitant', {count: visitedPop })} {t('that-is')} <span className="text-red-600">{secondPourcent.toFixed(2)}%</span> {t('of-the-total-population')}<br />
          <span className="text-green-500">{Intl.NumberFormat(lang, {maximumFractionDigits: 2, minimumFractionDigits: 2}).format(visitedSurf)}</span> km² {t('that-is')} <span className="text-green-500">{thirdPourcent.toFixed(2)}%</span> {t('of-the-total-surface')}
        </div>
        <div className="text-left mb-4">
          {t('the-most-populated')} : {maxPop.nom} {t('with')} {Intl.NumberFormat(lang).format(maxPop.population)} {t('inhabitant', {count: maxPop.population })}<br/>
          {t('the-less-populated')} : {minPop.nom} {t('with')} {Intl.NumberFormat(lang).format(minPop.population)} {t('inhabitant', {count: minPop.population })}
        </div>
        <div className="text-left mb-4">
        {t('the-largest')} : {maxSurf.nom} {t('with')} {Intl.NumberFormat(lang, {maximumFractionDigits: 2,}).format(maxPop.surface)} km²<br/>
        {t('the-smallest')} : {minSurf.nom} {t('with')} {Intl.NumberFormat(lang, {maximumFractionDigits: 2,}).format(minPop.surface)} km²
        </div>
        <div className="text-left mb-3">
        {t('the-highest')} : {maxAlt.nom} {t('with')} {Intl.NumberFormat(lang).format(maxAlt.altitude)} m<br/>
        {t('the-lowest')} : {minAlt.nom} {t('with')} {Intl.NumberFormat(lang).format(minAlt.altitude)} m<br/>
        {t('mean-altitude')} : {visitedAltMoyenne.toFixed(2)} m
        </div>
        <div className="text-center text-xs mb-2">
        {t('calculation-note')}
        </div>
      </div>
    </>
  )
}

export default JeuCommunes;