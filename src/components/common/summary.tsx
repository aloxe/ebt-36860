import { ScoreCard } from "./scoreCard";

async function  Summary({user, visited}: {user: publicUser, visited: visited}) {

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
          <ScoreCard icon="📍" score={visited.visitedCities.length} label="locations" />
          <ScoreCard icon="🏘️" score={visited.communes.length} label="communes" />
          <ScoreCard icon="🇫🇷" score={visited.departements.length} label="départements" />
          <ScoreCard icon="🏛️" score={visited.prefectures.length} label="préfectures" />
        </div>
      </div>
    </>
  )
}

export default Summary;