'use client'
import Profile from "@/components/stats/profile";
// import { formatDayDate } from "@/helpers/strings";
import { useAuth } from "@/context/authcontext";
import { savePlayerData } from "@/helpers/dbutils";
import { refreshUser } from "@/helpers/ebtutils";
import { useState } from "react";

const  UserDetails = () => {
  const { user, setUser } = useAuth();
  const [requestRefresh, setRequestRefresh] = useState<boolean>(false);

    const handleRefreshUser = async (event: React.MouseEvent<HTMLAnchorElement>) => {
      console.log("click");
      setRequestRefresh(true);
      var login = user.email
      var id = user.id
      const loginUser = await refreshUser(user);
      loginUser && console.log("…loginUser", loginUser);
      if (loginUser) {
        loginUser.date =  Date.now();
        loginUser.email = login;
        loginUser.id = id;

        sessionStorage.setItem('user', JSON.stringify(loginUser));
        await savePlayerData({user: loginUser, visited: null, polygon: null})
        setUser(loginUser);
        setRequestRefresh(false);
      } else {
      console.log('Fetch relogin Error :-S');
      setRequestRefresh(false);
      }
  }

  console.log(user);
  
  return (
    // <Profile user={user} handleRefreshUser={handleRefreshUser} />
    <Profile user={user} handleRefreshUser={handleRefreshUser} />
    )
}

export default UserDetails