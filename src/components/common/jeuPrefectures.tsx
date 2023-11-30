import PostToForum from "./postToForum";

interface JeuPrefecturesProps {
  lang: string
  user: User
  prefectures: string[]
  cities: City[]
  heading: string;
  isDashboard?: boolean;
}

function JeuPrefectures({lang, user, prefectures, cities, heading, isDashboard}: JeuPrefecturesProps) {
  const departementsWithDomTom: Departement[] = require('@etalab/decoupage-administratif/data/departements.json')
  const departementsMetro = departementsWithDomTom.filter(el => el.zone === "metro")

    // TODO add flag
    const BBCode = `[size=150]MÀJ de ${user.username}[/size] : ${prefectures.length} ${prefectures.length > 1 ? "préfectures" : "préfecture" }` + 
    departementsMetro.map(departement => {
      if (prefectures.includes(departement.chefLieu)) {
        const pref = cities.find(city => city.code === departement.chefLieu)
        if (!!pref) return "\n[color=lightslategray][b]" + departement.code + "[/b][/color] " + pref.commune ?? pref.city + `
        `
        else return ""
      }
    }).join('') + 
    `

    [size=85]calculé sur [url=https://ebt.fr.eu.org/]▤ 36680 ▥[/url][/size]`;

  return (
    <>
      <div className="bg-white rounded-lg border border-blue-200 text-left text-black p-2 m-2 sm:p-4 sm:m-4">
        <div className="flex justify-between">
          <h2>
            {heading}
          </h2>
        </div>
        <div className="text-left text-md mb-4">
          <>
          {departementsMetro.map(departement => {
            if (prefectures.includes(departement.chefLieu)) {
              const pref = cities.find(city => city.code === departement.chefLieu)
              return pref && <div><b key={pref.code}>{departement.code}</b> {pref.commune || pref.city}</div>
            }
          })}
          </>
        </div>
        {!isDashboard && <></>}
        {isDashboard && <>
          {/* /!\ bellow is a client component */}
          <PostToForum lang={lang} message={BBCode} topic={"11477"} />
        </>}
      </div>
    </>
  )
}

export default JeuPrefectures;