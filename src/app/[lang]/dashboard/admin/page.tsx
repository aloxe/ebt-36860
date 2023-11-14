import { getNewPlayers } from "@/helpers/leaderutils";
import AdminPage from "./adminPage";

const Admin = async () => {
  const players = await getNewPlayers()

  return (
  <div className="bg-white rounded-lg border border-blue-200 text-left text-blue-900 p-2 m-2 sm:p-4 sm:m-4">
    <div className="text-stone-600 text-sm">
      <AdminPage players={players} />
    </div>
  </div>
  )
}

export default Admin