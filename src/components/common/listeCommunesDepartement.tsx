
async function ListeCommunesDepartement({visitedCommunes, departement}: {visitedCommunes: commune[], departement: any}) {

//   const visitedCommunes: commune[] = await Promise.all(visited.communes.map(async (code: string): Promise<commune> => {
//     let visitedCommune = await fetchComplete(code);
//     return visitedCommune;
// }));

  return (
    <>
    <tr key={departement.code} className={visitedCommunes.filter(function(commune: commune){
        return commune?.departement?.code === departement.code }).length < 1 ? "bg-sky-100 opacity-20" : "bg-sky-200"}>
        <th colSpan={3} className="whitespace-nowrap px-6 py-4">{departement.nom} ({departement.code})</th>
        <th colSpan={1} className="whitespace-nowrap px-6 py-4">{visitedCommunes.filter(function(commune: commune){
        return commune?.departement?.code === departement.code }).length}</th>
    </tr>
    {visitedCommunes.map( commune => (
      <tr className="border-b dark:border-neutral-500" key={commune.code}>
        <td className="whitespace-nowrap px-6 py-4">
          {commune?.codesPostaux[0]}
        {!!commune?.codesPostaux[1] && "…"}
        </td>
        <td className="whitespace-nowrap px-6 py-4">{commune.nom}</td>
        <td className="whitespace-nowrap px-6 py-4">
          {(commune?.surface || 0 / 100).toFixed(2)} km²<br />
          {commune?.population} hab.
        </td>
      </tr>
    ))}
    </>
  )
}

export default ListeCommunesDepartement;