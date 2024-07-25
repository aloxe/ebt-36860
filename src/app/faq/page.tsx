import TitleButton from "@/components/common/titleButton";

const Faq = async () => {

  return (
    <>
      <div className="relative flex place-items-center mb-2 before:absolute before:h-[300px] before:w-[480px] before:-translate-x-1/2 before:rounded-full before:bg-gradient-radial before:from-white before:to-transparent before:blur-2xl before:content-[''] after:absolute after:-z-20 after:h-[180px] after:w-[240px] after:translate-x-1/3 after:bg-gradient-conic after:from-sky-200 after:via-blue-200 after:blur-2xl after:content-[''] before:dark:bg-gradient-to-br before:dark:from-transparent before:dark:to-blue-700 before:dark:opacity-10 after:dark:from-sky-900 after:dark:via-[#0141ff] after:dark:opacity-40 before:lg:h-[360px] z-[-1]">
        <h1>Travel in France, collect euros and map your your trips</h1>
      </div>

      <div className="group bg-white rounded-lg border border-blue-200 text-left  p-2 m-2 sm:p-4 sm:m-4">
        <h2>What is Eurobilltracker?</h2>
        <p className="mb-4">
          Eurobilltracker is a website that allows you to record euro bank note serial numbers. If someone else finds the same bank note you will be able to follow where your banknotes go after you spend them.
        </p>

        <h2>What is the purpose of Eurobilltracker?</h2>
        <p className="mb-4">
          Tracking bank notes is usless, meaningless and futile, therefore this is essencial. Thouthands are tracking banknotes all over the world, whereever they go. Eurobilltracker helps them connect and if lucky, they will perform a <i>hit</i>, when someone find a note that wall already tracked on Eurobilltracker.
        </p>
        <p className="mb-4">
           Want to try by yourself? <a href="https://en.eurobilltracker.com/?referer=31378">Just register</a> and start track your euros now!
        </p>

        <h2>What is te site ▤ 36680 ▥ about?</h2>
        <p className="mb-4">
          36680 Helps you track all locations you visited based on the euros you tracked on Eurobilltracker.
        </p>
        <p className="mb-4">
          When trakking euros while travelling, it is interesting to pinpoint where you&apos;ve been but it is not always easy to remember all places. It is particularly difficult in France where the number of municipalities is high. There was 36680 municipalities in the year 2000. This gives the name of this site.
        </p>
        <p className="mb-4">
          When you log in with your Eurobilltracker credentials, we will help you gather all locations you visited in France and see which districts, municipalities and regions you visited. It will count them for you and draw nice maps so you can effectivly see where you&apos;ve been.
        </p>

        <h2>What is the ranking on ▤ 36680 ▥?</h2>
        <p className="mb-4">
          Visiting 36680 municipalities and find euros in each of them is quite a challenge. This has started as a game for Eurobilltraker users <a href="https://forum.eurobilltracker.com/viewtopic.php?f=34&t=7171">launched by TedX on Eurobilltracker forum</a>. This game also counts population and surface for all players. The main ranking counts the number of visited municipalities. This is the ranking you see on <b>▤ 36680 ▥</b>.
        </p>
        <p className="mb-4">
          <b>▤ 36680 ▥</b> allows you also to compete with other players on the number of districs, of administrative cental cities and regions.
        </p>
        <p className="mb-4">
          This is fun and challenging! Why don&apos;t you start today.
        </p>
      </div>

      <TitleButton
      label={"Register now"}
      href="https://fr.eurobilltracker.com/?referer=31378"
      />
    </>
  )
}

export default Faq
