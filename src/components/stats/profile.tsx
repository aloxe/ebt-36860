import { MouseEventHandler } from "react";
import { useTranslation } from '@/i18n'
import ProfileView from "@/components/common/profileView";

async function  Profile({lang, user, handleRefreshUser, className, requestRefresh}: {lang: string, user: User, handleRefreshUser?: MouseEventHandler, className?: string, requestRefresh?: boolean}) {
  /* eslint-disable react-hooks/rules-of-hooks */
  const { t } = await useTranslation(lang, 'stats')

  return (
    <ProfileView 
    user={user}
    handleRefreshUser={handleRefreshUser}
    className={className}
    requestRefresh={requestRefresh}
    loadingUser={t("loading-user")}
    banknoteLabel={t("banknote", {count: user?.totalbills})}
    hitLabel={t("hit", {count: user?.totalbills})}
    lang={lang}
    />
  )
}

export default Profile;