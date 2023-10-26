'use client'
import Profile from "@/components/stats/profile";
import { useAuth } from "@/context/authcontext";
import { refreshUser } from "@/helpers/ebtutils";
import { useState } from "react";

const  UserDetails = () => {
  const { user, setUser } = useAuth();
  const [requestRefresh, setRequestRefresh] = useState<boolean>(false);

    const handleRefreshUser = async (event: React.MouseEvent<HTMLAnchorElement>) => {
      setRequestRefresh(true);
      var login = user.email
      var id = user.id
      const loginUser = await refreshUser(user);
      if (loginUser) {
        loginUser.date =  Date.now();
        loginUser.email = login;
        loginUser.id = id;

        sessionStorage.setItem('user', JSON.stringify(loginUser));
        setUser(loginUser);
        setRequestRefresh(false);
      } else {
      console.log('Fetch relogin Error :-S');
      setRequestRefresh(false);
      }
  }

  return (
    <Profile 
      user={user} 
      handleRefreshUser={handleRefreshUser} 
      requestRefresh={requestRefresh} />
  )
}

export default UserDetails