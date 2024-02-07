'use client'
import { useAuth } from "@/context/authcontext";
import { useTranslation } from '@/i18n/client'
import AdminLinks from "@/components/common/adminLinks";
import UserDetails from "../userdetails";
import { DeptMapView } from "./departementMapView";

export default function Dashboard({ params: { lang } }: { params: { lang: string } }) {
  /* eslint-disable react-hooks/rules-of-hooks */
  const { t } = useTranslation(lang, 'dashboard')
  const { user } = useAuth();
  const username = user ? user.username : "";

  if (!user) {
    return (
      <div className="md:table border-spacing-x-4">
       <h3>You need to log in to see this page…</h3>
      </div>
    )
  }

  return (
      <>
      <AdminLinks lang={lang} />
      <div className="md:table border-spacing-x-4">
        <div className="md:basis-1/4 md:table-cell">
         {username && <DeptMapView lang={lang} user={user} />}
        </div>
      </div>
      </>
    )
}
