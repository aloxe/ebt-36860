'use client'
import { useAuth } from "@/context/authcontext";
import Link from "next/link";
import { useTranslation } from '@/i18n/client'

function AdminLinks({ lang }: { lang: string }) {
  /* eslint-disable react-hooks/rules-of-hooks */
  const { t } = useTranslation(lang, 'dashboard')
  const { isAdmin, isTrans } = useAuth()
  const isTransLangs = isTrans.split(',');

  return (
    <div className="block w-full">
        {!isAdmin && !isTrans && <></>}
        {isAdmin && <><Link href={`/${lang}/dashboard/admin`}>{t('admin-page')}</Link> | </>}
        {isTrans && (<>
        {t('translations-')} {isTransLangs.map((transLang: string) => (
        <span key={transLang} > <Link href={`/${lang}/dashboard/translations/${transLang}`}>{transLang}</Link> |</span>
        ))}
      </>)}
    </div>
  );
};

export default AdminLinks;