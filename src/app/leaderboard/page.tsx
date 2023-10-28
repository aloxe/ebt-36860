import { getAllPlayers } from "@/helpers/leaderutils";
import LeaderTable from "./leaderTable";

const LeaderBoard = async () => {

  const players = await getAllPlayers()

  return (
  <div className="bg-white rounded-lg border border-blue-200 text-left text-blue-900 sm:p-4 sm:m-4 xs:p-2 xs:m-2">
    <div className="text-right text-stone-600 text-sm">
      <h2>Leaderboard</h2>
      <LeaderTable players={players} />
    </div>
  </div>
  )
}

export default LeaderBoard