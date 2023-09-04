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
        {user?.my_city && <div className="text-right text-stone-400 text-sm">{date} 
          <span className="text-right text-blue-900 text-lg cursor-pointer" onClick={handleRefreshUser}> ⟳ </span>
      </div>}
      </div>
      {!user?.my_city && requestRefresh && <><br/><br/><Spinner /></> }
      {user?.my_city && <div>
        👤 :
        {user.id !== user.username
        ? <a href={`https://fr.eurobilltracker.com/profile/?user=${user.id}`} target="_blank">{user.username} (🔗)</a>
        : <>{user.username}</>}
        <br />📧 : {user.email}
        <br />🏠 : {user.my_city}, {user.my_country}
        <br />💶 : {user.totalbills}
        <br />🌟 : {user.totalhits}
      </div> }
    </div>
    )
}
