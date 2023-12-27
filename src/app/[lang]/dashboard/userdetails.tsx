'use client'
import { useAuth } from "@/context/authcontext";
import { refreshUser } from "@/helpers/ebtutils";
import { useState } from "react";
import Profile from "./profileView";
import { completeUser } from "@/helpers/users";

const  UserDetails = ({ lang }: {lang: string}) => {
  const { user, saveUser, logout } = useAuth();
  const [requestRefresh, setRequestRefresh] = useState<boolean>(false);
  const [expired, setExpired] = useState<boolean>(false);

  const handleLogout = () => logout()

  const handleRefreshUser = async (event: React.MouseEvent<HTMLAnchorElement>) => {
    setRequestRefresh(true);
    let loginUser = await refreshUser(user);
    if (loginUser) {
      loginUser.id = user.id;
      loginUser = completeUser(loginUser, user.email)
      saveUser(loginUser);
      // TODO check if useful
      setRequestRefresh(false);
    } else {
    console.log('Fetch relogin Error :-S');
    setRequestRefresh(false);
    setExpired(true);
    }
  }

  return (
    <Profile
      lang={lang}
      user={user}
      requestRefresh={requestRefresh}
      expired={expired}
      handleRefreshUser={handleRefreshUser}
      handleLogout={handleLogout} />
  )
}

export default UserDetails
