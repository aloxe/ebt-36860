import LinkButton from "@/components/common/linkButton";
import TitleButton from "@/components/common/titleButton";
import { getAllPlayersSorted } from "@/helpers/leaderutils";
import LeaderTable from "@/app/[lang]/leaderboard/leaderTable";
import { useTranslation } from '@/i18n'

export default async function Home({ params: { lang } }: { params: { lang: string}}) {
  const allPlayers = await getAllPlayersSorted("score");
  const players = allPlayers.slice(0,4);
  /* eslint-disable react-hooks/rules-of-hooks */
  const { t } = await useTranslation(lang, ['home', 'translations'])
  
  return (
    <>
      <div className="relative place-items-center mb-2">
        <h1>{t("moto")}</h1>
      </div>

      <div className="group bg-white rounded-lg border border-blue-200 text-left mx-0 p-2 my-2 sm:p-4 sm:m-4">
        <h2>{t("current-leaders")}</h2>
        <LeaderTable players={players} lang={lang} type="score"/>
        <LinkButton label={"All players"} href={`/${lang}/leaderboard/`}/>
      </div>

      <div className="group bg-white rounded-lg border border-blue-200 text-left p-2 m-2 sm:p-4 sm:m-4">
        <h2>
        {t("how-to-play")}
        </h2>
        <ol>
          <li>{t("register-on")} <a href="https://fr.eurobilltracker.com/?referer=31378">eurobilltracker</a></li>
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
