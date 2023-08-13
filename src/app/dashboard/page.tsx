'use client'
import { useState, useEffect } from "react"; 
import { Cities } from '../_components/cities';

export default function Dashboard() {
  const [user, setUser] = useState<any>(undefined);

  useEffect(() => {
    const storeUser = typeof window !== 'undefined' && JSON.parse(localStorage.getItem('user') || "{}");
    storeUser.username && setUser(storeUser);
  }, [])
  var d = new Date(user?.date);
  const date = d.toLocaleString("en-GB", { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })

  if (!user) {
    return (
      <>
        <div className="relative flex place-items-center before:absolute before:h-[300px] before:w-[480px] before:-translate-x-1/2 before:rounded-full before:bg-gradient-radial before:from-white before:to-transparent before:blur-2xl before:content-[''] after:absolute after:-z-20 after:h-[180px] after:w-[240px] after:translate-x-1/3 after:bg-gradient-conic after:from-sky-200 after:via-blue-200 after:blur-2xl after:content-[''] before:dark:bg-gradient-to-br before:dark:from-transparent before:dark:to-blue-700 before:dark:opacity-10 after:dark:from-sky-900 after:dark:via-[#0141ff] after:dark:opacity-40 before:lg:h-[360px] z-[-1]">
          <h1>You need to login to see this page</h1>
        </div>
      </>
    )
  }

  return (
      <>
        <div className="relative flex place-items-center before:absolute before:h-[300px] before:w-[480px] before:-translate-x-1/2 before:rounded-full before:bg-gradient-radial before:from-white before:to-transparent before:blur-2xl before:content-[''] after:absolute after:-z-20 after:h-[180px] after:w-[240px] after:translate-x-1/3 after:bg-gradient-conic after:from-sky-200 after:via-blue-200 after:blur-2xl after:content-[''] before:dark:bg-gradient-to-br before:dark:from-transparent before:dark:to-blue-700 before:dark:opacity-10 after:dark:from-sky-900 after:dark:via-[#0141ff] after:dark:opacity-40 before:lg:h-[360px] z-[-1]">
          <h1>Dashboard of {user.username}</h1>
        </div>
      <div className="bg-white rounded-lg border border-blue-200 text-left text-blue-900 p-4 m-5">
        <div className="flex justify-between">
          <h2>Profile</h2>
          <div className="text-right text-stone-400 text-sm">{date} <span className="text-right  text-blue-900 text-lg">⟳</span></div>
          
        </div>
        <p>
          <br />👤 name: {user.username}
          <br />📧 email: {user.email}
          <br />🏠 location: {user.my_city}, {user.my_country}
          <br />💶 banknotes: {user.totalbills}
          <br />🌟 hits: {user.totalhits}
        </p>
      </div>
          <Cities />
      </>
    )
}
