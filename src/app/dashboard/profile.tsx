'use client'
import { useState } from "react";
import { useAuth } from "@/hooks/authprovider"
import { refreshUser } from "@/helpers/ebtutils";
import Spinner from "@/components/spinner";

export function Profile() {
  const { user, setUser } = useAuth();
  const [requestRefresh, setRequestRefresh] = useState<boolean>(false);

  var d = new Date(user?.date);
  const date = d.toLocaleString("en-GB", { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })

    const handleRefreshUser = async (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    const citySave = user.my_city;
    user.my_city = undefined;
    setRequestRefresh(true);
    var login = user.email
    const loginUser = await refreshUser(user);
    if (loginUser) {
      loginUser.date = Date.now();
      loginUser.email = login;
      console.log(loginUser);
      setUser(loginUser);
      setRequestRefresh(false);
      localStorage.setItem('user', JSON.stringify(loginUser));
    } else {
      console.log('Fetch relogin Error :-S');
      user.my_city = citySave;
      setRequestRefresh(false);
    }
  }

  return (
    <div className="bg-white rounded-lg border border-blue-200 text-left text-blue-900 p-4 m-5">
      <div className="flex justify-between">
        <h2>Profile</h2>
        {user?.username && <div className="text-right text-stone-400 text-sm">{date} 
          <span className="text-right text-blue-900 text-lg cursor-pointer" onClick={handleRefreshUser}> ⟳ </span>
      </div>}
      </div>
      {!user?.my_city && requestRefresh && <><br/><br/><Spinner /></> }
      {user?.my_city && <p>
        <br />👤 name: {user.username}
        <br />📧 email: {user.email}
        <br />🏠 location: {user.my_city}, {user.my_country}
        <br />💶 banknotes: {user.totalbills}
        <br />🌟 hits: {user.totalhits}
      </p> }
    </div>
    )
}
