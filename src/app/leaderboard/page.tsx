import { getAllPlayers } from "@/helpers/leaderutils";
import LeaderTable from "./leaderTable";

const LeaderBoard = async () => {

  const players = await getAllPlayers()

  return (
    <div className="bg-white rounded-lg border border-blue-200 text-left text-blue-900 p-2 m-2 sm:p-4 sm:m-4">
     <div className="text-stone-600 text-sm">
      <h2>Leaderboard</h2>
      <LeaderTable players={players} />
    </div>
  </div>
  )
}

export default LeaderBoard
