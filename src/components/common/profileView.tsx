import { ScoreCard } from "@/components/common/scoreCard";
import { formatDayDate, getUserFlag } from "@/helpers/strings";
import { MouseEventHandler } from "react";
import Spinner from "./spinner";

type ProfileViewProps = {
    user: User, 
    handleRefreshUser?: MouseEventHandler, 
    className?: string, 
    requestRefresh?: boolean
    loadingUser: string,
    banknoteLabel: string,
    hitLabel: string, 
    lang: string,
  }

function ProfileView({
    user, 
    handleRefreshUser, 
    className, 
    requestRefresh,
    loadingUser,
    banknoteLabel,
    hitLabel,
    lang
}: ProfileViewProps) {

  const isLoggedIn = !!user.sessionid;
  return (
    <>
      <div className={`${className} bg-white rounded-lg border border-blue-200 text-left p-2 m-2 sm:p-4 sm:m-4`}>
        <div className="flex justify-between">
          <h2>
            {user.username}
          </h2>
          {isLoggedIn && !requestRefresh && <div className="text-right text-stone-400 text-sm">{formatDayDate(user.date)}
            <span className="text-right text-blue-900 text-lg cursor-pointer" onClick={handleRefreshUser}> ⟳ </span>
        </div>}
        </div>
        {requestRefresh ? 
        <><br/><Spinner /> {loadingUser}</>
        : 
        <><div>
          👤 : <a href={`https://fr.eurobilltracker.com/profile/?user=${user.id}`} target="_blank">{user.username} (🔗)</a>
          {isLoggedIn && <><br />📧 : {user.email}</>}
          <br />🏠 : {user.my_city}, {getUserFlag(user.my_country)} {user.my_country}
        </div>
        <div className="flex justify-around mt-2">
          <ScoreCard icon="💶" score={user?.totalbills} label={banknoteLabel} lang={lang} />
          <ScoreCard icon="🏆" score={user?.totalhits} label={hitLabel} lang={lang} />
        </div></>}
      </div>
    </>
  )
}

export default ProfileView;