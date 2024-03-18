import { getNewPlayers } from "@/helpers/leaderutils";
import UserList from "./userList";
import AdminLinks from "@/components/common/adminLinks";

// https://nextjs.org/docs/app/api-reference/file-conventions/route-segment-config
export const revalidate = 600

const Admin = async ({ params: { lang } }: { params: { lang: string } }) => {
  const players = await getNewPlayers()

  return (
    <>
    <AdminLinks lang={lang} />
    <div className="bg-white rounded-lg border border-blue-200 text-left text-blue-900 p-2 m-2 sm:p-4 sm:m-4">
      <div className="text-stone-600 text-sm">
        <UserList players={players} />
      </div>
    </div>
    </>
  )
}

export default Admin