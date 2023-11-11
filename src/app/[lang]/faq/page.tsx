import TitleButton from "@/components/common/titleButton";
import Link from "next/link";
import { useTranslation } from '@/i18n'

const Faq = async ({ params: { lang } }: { params: { lang: string}}) => {
  /* eslint-disable react-hooks/rules-of-hooks */
  const { t } = await useTranslation(lang, 'faq')

  return (
    <>
      <div className="relative flex place-items-center mb-2 before:absolute before:h-[300px] before:w-[480px] before:-translate-x-1/2 before:rounded-full before:bg-gradient-radial before:from-white before:to-transparent before:blur-2xl before:content-[''] after:absolute after:-z-20 after:h-[180px] after:w-[240px] after:translate-x-1/3 after:bg-gradient-conic after:from-sky-200 after:via-blue-200 after:blur-2xl after:content-[''] before:dark:bg-gradient-to-br before:dark:from-transparent before:dark:to-blue-700 before:dark:opacity-10 after:dark:from-sky-900 after:dark:via-[#0141ff] after:dark:opacity-40 before:lg:h-[360px] z-[-1]">
        <h1>{t("moto")}</h1>
      </div>

      <div className="group bg-white rounded-lg border border-blue-200 text-left  p-2 m-2 sm:p-4 sm:m-4">
        <h2>{t("what-is-ebt")}</h2>
        <p className="mb-4">
        {t("what-is-ebt-res")}
        </p>

        <h2>{t("what-is-purpose")}</h2>
        <p className="mb-4">
        {t("what-is-purpose-res1")}
        </p>
        <p className="mb-4">
        {t("what-is-purpose-res2")}
        </p>
        <p className="mb-4">
        {t("want-to-try")} <Link href={t("register-link")}>{t("register")}</Link> {t("what-is-purpose-res3")}
        </p>

        <h2>{t("what-is-36680")}</h2>
        <p className="mb-4">
        {t("what-is-36680-res1")}
        </p>
        <p className="mb-4">
        {t("what-is-36680-res2")}
        </p>
        <p className="mb-4">
        {t("what-is-36680-res3")}
        </p>

        <h2>{t("what-is-ranking-36680")}</h2>
        <p className="mb-4">
        {t("what-is-ranking-36680-res1")} <Link href={t("launched-by-link")}>{t("launched-by")}</Link>. {t("what-is-ranking-36680-res2")}
        </p>
        <p className="mb-4">
        {t("what-is-ranking-36680-res3")}
        </p>
        <p className="mb-4">
        {t("what-is-ranking-36680-res4")}
          
        </p>

        <h2>{t("how-to-report")}</h2>
        <p className="mb-4">
        {t("how-to-report-res")}
        </p>

        <h2>{t("how-to-contact")}</h2>
        <p className="mb-4">
        {t("how-to-contact-res1")} <Link href={t("contact-me-link")}>{t("contact-me")}</Link> {t("contact-me-end")} 
        {t("how-to-contact-res2")} <Link href={t("home-page-link")}>{t("home-page")}</Link>{t("home-page-end")}
        
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