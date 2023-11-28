import Profile from "@/components/stats/profile";
import Summary from "@/components/stats/summary";

interface HeaderProps {
    lang: string
    id: string
    user: User
    date?: Date
    count: any
  }

const StatsHeader = ({ lang, user, date, count }: HeaderProps) => {
  return (
    <div className="md:table border-spacing-x-4">
    {/*TODO collapse these two on detail page */}
    <Profile lang={lang} user={user} className="md:basis-1/4 md:table-cell"/>
    <Summary lang={lang} user={user} count={count} date={date} 
      className="md:basis-1/4 md:table-cell"
    />
  </div>
  )
}

export default StatsHeader