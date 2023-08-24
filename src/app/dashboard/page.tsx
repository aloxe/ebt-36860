'use client'
import { useAuth } from "../_hooks/authprovider";
import { Cities } from './cities';
import { Profile } from './profile';

interface user {
  "sessionid": string
  "username": string
  "my_city": string[]
  "my_country": string
  "my_zip": string
  "totalbills": number
  "totalhits": number
  "email": string
  "date": string
}

export default function Dashboard() {
  const { user, setUser } = useAuth();

  var d = new Date(user?.date);
  const date = d.toLocaleString("en-GB", { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })

  // TODO find a better way to have long hydration
  // TODO find a way to update page when user logs in
  // https://egghead.io/lessons/react-store-a-token-globally-with-react-context-for-easier-use-anywhere-in-a-next-js-app
  return (
      <>
      <div className="relative flex place-items-center before:absolute before:h-[300px] before:w-[480px] before:-translate-x-1/2 before:rounded-full before:bg-gradient-radial before:from-white before:to-transparent before:blur-2xl before:content-[''] after:absolute after:-z-20 after:h-[180px] after:w-[240px] after:translate-x-1/3 after:bg-gradient-conic after:from-sky-200 after:via-blue-200 after:blur-2xl after:content-[''] before:dark:bg-gradient-to-br before:dark:from-transparent before:dark:to-blue-700 before:dark:opacity-10 after:dark:from-sky-900 after:dark:via-[#0141ff] after:dark:opacity-40 before:lg:h-[360px] z-[-1]">
        <h1>
          {!user && `You need to log in to see this page…`}
          {user?.username && `Dashboard of ${user.username}`}
          </h1>
      </div>
      {user?.username && <Profile />}
      {user?.username && <Cities />}
      </>
    )
}
