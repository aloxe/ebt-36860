import { ScoreCard } from "@/components/stats/scoreCard";
import { formatDayDate, getUserFlag } from "@/helpers/strings";
import { MouseEventHandler } from "react";

function  Profile({user, handleRefreshUser, className}: {user: user, handleRefreshUser?: MouseEventHandler, className?: string}) {

  const isLoggedIn = !!user.sessionid;
  return (
    <>
      <div className={`${className} bg-white rounded-lg border border-blue-200 text-left text-blue-900 p-4 m-5`}>
        <div className="flex justify-between">
          <h2 className="mb-3 text-lg font-semibold">
            {user.username}
          </h2>
          {isLoggedIn && <div className="text-right text-stone-400 text-sm">{formatDayDate(user.date)}
            <span className="text-right text-blue-900 text-lg cursor-pointer" onClick={handleRefreshUser}> ⟳ </span>
        </div>}
        </div>
        <div>
          👤 : <a href={`https://fr.eurobilltracker.com/profile/?user=${user.id}`} target="_blank">{user.username} (🔗)</a>
          {isLoggedIn && <><br />📧 : {user.email}</>}
          <br />🏠 : {user.my_city}, {getUserFlag(user.my_country)} {user.my_country}
        </div>
        <div className="flex justify-around">
          <ScoreCard icon="💶" score={user?.totalbills} label="banknote" />
          <ScoreCard icon="🏆" score={user?.totalhits} label="hit" />
        </div>
      </div>
    </>
  )
}

export default Profile;