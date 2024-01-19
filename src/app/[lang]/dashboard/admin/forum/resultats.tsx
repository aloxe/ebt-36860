'use client'
import { useAuth } from "@/context/authcontext";
import PostToForum from "@/components/common/postToForum";
import { compareAlt, comparePop, compareScore, compareSurf } from "@/helpers/strings";
import { formatDate } from "@/helpers/time";


const  Resultats = ({ players, lang, allCommunes }: {players: User[], lang: string, allCommunes: Commune[]}) => {
  const { isAdmin } = useAuth()
  const now = Date.now();

  const allCommunesPop: number[] = allCommunes.map(el => el.population || 0)
  const allPop = allCommunesPop.reduce((buf, a) => buf + a)

  const allCommunesSurf: number[] = allCommunes.map(el => el.surface || 0)
  const allSurface = allCommunesSurf.reduce((a, b) => a + b) / 100

  let BBCode1 = ""
  players && players.sort( compareScore ).map((p,i) => {
    if (p.score) {
      BBCode1 += `${i+1}. ${p.my_flag} ${p.username}: …………… ${Intl.NumberFormat("fr").format(p.score)} communes soit ${(p.score * 100 / allCommunes.length).toFixed(3)}%   [size=85](${formatDate(lang, 'MM-YYYY', p.date)})[/size]\n`
    }   
  });

  let BBCode2 = ""
  players && players.sort( comparePop ).map((p,i) => {
    if (p.pop) {
      BBCode2 += `${i+1}. ${p.my_flag} ${p.username}: …………… ${Intl.NumberFormat("fr").format(p.pop)} habitants soit ${(p.pop * 100 / allPop).toFixed(2)}%   [size=85](${formatDate(lang, 'MM-YYYY', p.date)})[/size]\n`
    }   
  });

  let BBCode3 = ""
  players && players.sort( compareSurf ).map((p,i) => {
    if (p.surf) {
      BBCode3 += `${i+1}. ${p.my_flag} ${p.username}: ……… ${Intl.NumberFormat("fr").format(p.surf *100)} hectares soit ${(p.surf * 100 / allSurface).toFixed(0)}%   [size=85](${formatDate(lang, 'MM-YYYY', p.date)})[/size]\n`
    }   
  });

  let BBCode4 = ""
  players && players.sort( compareAlt ).map((p,i) => {
    if (p.alt) {
      BBCode4 += `${i+1}. ${p.my_flag} ${p.username}: ……… ${Intl.NumberFormat("fr").format(p.alt)} m.   [size=85](${formatDate(lang, 'MM-YYYY', p.date)})[/size]\n`
    }   
  });

  if (!isAdmin) return <></>

  const BBCode = `
  [size=150][color=indigo][b]Classement officiel au ${formatDate(lang, 'LL', now)}[/b][/color][/size]  

[size=120][color=blue]Classement par communes :[/color][/size]

${BBCode1}

[size=120][color=blue]Classement par population :[/color][/size]

${BBCode2}

[size=120][color=blue]Classement par superficie :[/color][/size]

${BBCode3}

[size=120][color=blue]Classement par altitude moyenne :[/color][/size]

${BBCode4}`

  return (
    <>
    <h2>[Jeu] Classement « 36860 communes »</h2>
      {/* /!\ bellow is a client component */}
      <PostToForum lang={lang} message={BBCode} topic={"7171"} />
    </>
  )
}

export default Resultats