import { MouseEventHandler } from "react";
import { useTranslation } from '@/i18n/client'
import ProfileView from "@/components/common/profileView";

function  Profile({lang, user, handleRefreshUser, className, requestRefresh}: {lang: string, user: User, handleRefreshUser?: MouseEventHandler, className?: string, requestRefresh?: boolean}) {
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
    />
  )
}

export default Profile;