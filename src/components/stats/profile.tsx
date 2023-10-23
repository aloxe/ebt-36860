import { ScoreCard } from "@/components/stats/scoreCard";
import { formatDayDate, getUserFlag } from "@/helpers/strings";
import { MouseEventHandler } from "react";
import Spinner from "../common/spinner";

function  Profile({user, handleRefreshUser, className, requestRefresh}: {user: User, handleRefreshUser?: MouseEventHandler, className?: string, requestRefresh?: boolean}) {

  const isLoggedIn = !!user.sessionid;
  return (
    <>
      <div className={`${className} bg-white rounded-lg border border-blue-200 text-left sm:p-4 sm:m-4 xs:p-2 xs:m-2`}>
        <div className="flex justify-between">
          <h2 className="mb-3 text-lg font-semibold">
            {user.username}
          </h2>
          {isLoggedIn && !requestRefresh && <div className="text-right text-stone-400 text-sm">{formatDayDate(user.date)}
            <span className="text-right text-blue-900 text-lg cursor-pointer" onClick={handleRefreshUser}> ⟳ </span>
        </div>}
        </div>
        {requestRefresh ? 
        <><br/><Spinner /> loading user details from eurobilltracker</>
        : 
        <><div>
          👤 : <a href={`https://fr.eurobilltracker.com/profile/?user=${user.id}`} target="_blank">{user.username} (🔗)</a>
          {isLoggedIn && <><br />📧 : {user.email}</>}
          <br />🏠 : {user.my_city}, {getUserFlag(user.my_country)} {user.my_country}
        </div>
        <div className="flex justify-around mt-2">
          <ScoreCard icon="💶" score={user?.totalbills} label="banknote" />
          <ScoreCard icon="🏆" score={user?.totalhits} label="hit" />
        </div></>}
      </div>
    </>
  )
}

export default Profile;