import { ScoreCard } from "@/components/stats/scoreCard";

async function  Summary({user, visited}: DetailsProps) {

    var d = new Date(visited?.date || '');
  const date = d.toLocaleString("en-GB", { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })

  return (
    <>
      <div className="bg-white rounded-lg border border-blue-200 text-left text-blue-900 p-4 m-5">
        <div className="flex justify-between">
          <h2 className="mb-3 text-lg font-semibold">
            {user.user_name} in France
          </h2>
          <div className="text-right text-stone-400 text-sm">
            last updated: {date}
          </div>
        </div>
        <div className="flex justify-between">
          <ScoreCard icon="📍" score={visited.visitedCities.length} label="location" />
          <ScoreCard icon="🏘️" score={visited.communes.length} label="commune" />
          <ScoreCard icon="🇫🇷" score={visited.departements.length} label="département" />
          <ScoreCard icon="🏛️" score={visited.prefectures.length} label="préfecture" />
        </div>
      </div>
    </>
  )
}

export default Summary;