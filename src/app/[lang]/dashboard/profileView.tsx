'use client'
import { MouseEventHandler } from "react";
import { useTranslation } from '@/i18n/client'
import ProfileView from "@/components/common/profileView";

interface ProfileProps {
  lang: string
  user: User
  handleRefreshUser?: MouseEventHandler
  handleLogout?: MouseEventHandler
  className?: string, 
  requestRefresh?: boolean
  expired?: boolean
}

const Profile = ({ lang, user, handleRefreshUser, handleLogout, className, requestRefresh, expired }: ProfileProps) => {
  /* eslint-disable react-hooks/rules-of-hooks */
  const { t } = useTranslation(lang, 'stats')

  return (
    <ProfileView
    user={user}
    handleRefreshUser={handleRefreshUser}
    className={className}
    requestRefresh={requestRefresh}
    loadingUser={t("loading-user")}
    banknoteLabel={t("banknote", {count: user.totalbills})}
    hitLabel={t("hit", {count: user.totalhits})}
    lang={lang}
    expired={expired}
    handleLogout={handleLogout}
    />
  )
}

export default Profile;