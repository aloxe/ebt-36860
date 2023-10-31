import LinkButton from "@/components/common/linkButton";
import TitleButton from "@/components/common/titleButton";
import { getAllPlayers } from "@/helpers/leaderutils";
import LeaderTable from "./leaderboard/leaderTable";

const Home = async () => {
  const allPlayers = await getAllPlayers();
  const players = allPlayers.slice(0,4);

  return (
    <>
      <div className="relative flex place-items-center mb-2 before:absolute before:h-[300px] before:w-[480px] before:-translate-x-1/2 before:rounded-full before:bg-gradient-radial before:from-white before:to-transparent before:blur-2xl before:content-[''] after:absolute after:-z-20 after:h-[180px] after:w-[240px] after:translate-x-1/3 after:bg-gradient-conic after:from-sky-200 after:via-blue-200 after:blur-2xl after:content-[''] before:dark:bg-gradient-to-br before:dark:from-transparent before:dark:to-blue-700 before:dark:opacity-10 after:dark:from-sky-900 after:dark:via-[#0141ff] after:dark:opacity-40 before:lg:h-[360px] z-[-1]">
        <h1>Travel in France, collect euros and map your your trips</h1>
      </div>

      <div className="group bg-white rounded-lg border border-blue-200 text-left mx-0 p-2 my-2 sm:p-4 sm:m-4">
        <h2>Current leaders</h2>
        <LeaderTable players={players} />
        <LinkButton label={"All players"} href="/leaderboard"/>
      </div>

      <div className="group bg-white rounded-lg border border-blue-200 text-left p-2 m-2 sm:p-4 sm:m-4">
        <h2>
          How to play?
        </h2>
        <ol>
          <li>Register on <a href="https://fr.eurobilltracker.com/?referer=31378">eurobilltracker</a></li>
          <li>Record your euro bank notes</li>
          <li>Travel to France find euros there</li>
          <li>Generate your map here</li>
        </ol>
        <LinkButton label={"Get to know more"} href="/faq"/>
      </div>

      <TitleButton
      label={"Player's forum"}
      href="https://forum.eurobilltracker.com/"
      />
    </>
  )
}

export default Home