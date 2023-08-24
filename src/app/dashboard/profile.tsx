'use client'
import { useAuth } from "../_hooks/authprovider"

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

export function Profile() {
  const { user, setUser } = useAuth();
  var d = new Date(user?.date);
  const date = d.toLocaleString("en-GB", { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })

  return (
    <div className="bg-white rounded-lg border border-blue-200 text-left text-blue-900 p-4 m-5">
      <div className="flex justify-between">
        <h2>Profile</h2>
        {user?.username && <div className="text-right text-stone-400 text-sm">{date} 
          <span className="text-right  text-blue-900 text-lg">⟳</span>
      </div>}
      </div>
      {user?.username && <p>
        <br />👤 name: {user.username}
        <br />📧 email: {user.email}
        <br />🏠 location: {user.my_city}, {user.my_country}
        <br />💶 banknotes: {user.totalbills}
        <br />🌟 hits: {user.totalhits}
      </p> }
    </div>
    )
}
