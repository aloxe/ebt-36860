import LinkButton from "@/components/common/linkButton";
import TitleButton from "@/components/common/titleButton";
import { getAllPlayers } from "@/helpers/leaderutils";
import LeaderTable from "@/app/[lang]/leaderboard/leaderTable";
import { useTranslation } from '@/i18n'

export default async function Home({ params: { lang } }: { params: { lang: string}}) {
  const allPlayers = await getAllPlayers();
  const players = allPlayers.slice(0,4);
  /* eslint-disable react-hooks/rules-of-hooks */
  const { t } = await useTranslation(lang, ['home', 'translations'])
  
  return (
    <>
      <div className="relative place-items-center mb-2 before:absolute before:h-[300px] before:w-[480px] before:-translate-x-1/2 before:rounded-full before:bg-gradient-radial before:from-white before:to-transparent before:blur-2xl before:content-[''] after:absolute after:-z-20 after:h-[180px] after:w-[240px] after:translate-x-1/3 after:bg-gradient-conic after:from-sky-200 after:via-blue-200 after:blur-2xl after:content-[''] before:dark:bg-gradient-to-br before:dark:from-transparent before:dark:to-blue-700 before:dark:opacity-10 after:dark:from-sky-900 after:dark:via-[#0141ff] after:dark:opacity-40 before:lg:h-[360px]">
        <h1>{t("moto")}</h1>
      </div>

      <div className="group bg-white rounded-lg border border-blue-200 text-left mx-0 p-2 my-2 sm:p-4 sm:m-4">
        <h2>{t("current-leaders")}</h2>
        <LeaderTable players={players} lang={lang} />
        <LinkButton label={"All players"} href={`/${lang}/leaderboard/`}/>
      </div>

      <div className="group bg-white rounded-lg border border-blue-200 text-left p-2 m-2 sm:p-4 sm:m-4">
        <h2>
        {t("how-to-play")}
        </h2>
        <ol>
          <li>{t("register-on")} <a href="https://fr.eurobilltracker.com/?referer=31378">eurobilltracker</a></li>
          <li>{t("register-on")}</li>
          <li>{t("travel-to-france-find-euros")}</li>
          <li>{t("generate-your-map-here")}</li>
        </ol>
        <LinkButton label={"Get to know more"} href={`/${lang}/faq/`}/>
      </div>

      <TitleButton
      label={t("players-forum")}
      href="https://forum.eurobilltracker.com/"
      />
    </>
  )
}
