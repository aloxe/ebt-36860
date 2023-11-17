'use client'
import { useAuth } from "@/context/authcontext";
import Link from "next/link";
import { useTranslation } from '@/i18n/client'

function AdminLinks({ lang }: { lang: string }) {
  /* eslint-disable react-hooks/rules-of-hooks */
  const { t } = useTranslation(lang, 'dashboard')
  const { isAdmin, isTrans } = useAuth()

  return (
    <div className="block">
        {isAdmin && <Link href={`/${lang}/dashboard/admin`}>{t('admin-page')}</Link>} | 
        {isTrans && <Link href={`/${lang}/dashboard/translations`}>{t('translations')}</Link>}
    </div>
  );
};

export default AdminLinks;