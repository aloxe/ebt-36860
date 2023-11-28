'use client'
import Spinner from "@/components/common/spinner";
import JeuCommunes from "@/components/common/jeuCommunes";
import { fetchAllComplete } from "@/helpers/cityutils";
import { useTranslation } from '@/i18n/client'
import { useEffect, useState } from "react";

interface ForumJeuCommunesProps {
  lang: string
  user: User
  communes: string[]
}

const ForumJeuCommunes = ({lang, user, communes}: ForumJeuCommunesProps) => {
    /* eslint-disable react-hooks/rules-of-hooks */
    const { t } = useTranslation(lang, 'stats')
    const [allCommunes, setAllCommunes] = useState<Commune[] | undefined>(undefined)
    const [visitedCommunes, setVisitedCommunes] = useState<CommuneWithData[] | undefined>(undefined)
    const [loading, setLoading] = useState<boolean>(false)

    useEffect(() => {
      if (!loading) {
        
        const fetchCommunes = async () => {
          const allCommunesWithDomTom: Commune[] = await fetchAllComplete();
          const allCommunes = allCommunesWithDomTom.filter(el => el.zone === "metro")
          setAllCommunes(allCommunes)
        }
        setLoading(true);
        fetchCommunes()
      }
    }, [loading])

    useEffect(() => {
      if (allCommunes) {
        const inseeAltitude = require('@/data/correspondance-code-insee-altitude-2013.json')
        const visitedCommunes = allCommunes.filter(c => communes.includes(c.code) ).map(c => ({
          code: c.code, 
          nom: c.nom, 
          population: c.population || 0,
          surface: c.surface ? c.surface / 100 : 0,
          // @ts-ignore
          altitude: parseInt(inseeAltitude.find(el => el.code === c.code)?.altitude),
        }))
        setVisitedCommunes(visitedCommunes)
      }
    }, [allCommunes])

  const username = user.username ?? "⸘";

  return (
    <>
      { !allCommunes || ! visitedCommunes && <Spinner /> }
      { allCommunes && visitedCommunes && <JeuCommunes lang={lang} t={t} username={username} allCommunes={allCommunes} visitedCommunes={visitedCommunes} isDashboard={true} />}
    </>
  )
}

export default ForumJeuCommunes;