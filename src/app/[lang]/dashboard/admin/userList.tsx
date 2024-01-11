'use client'
import { useAuth } from "@/context/authcontext";
import Spinner from "@/components/common/spinner";
import moment from "moment";
import 'moment/min/locales';
import { useTranslation } from '@/i18n/client'
import { getPlayerData, getVisits, getVisitsServer, saveUser, saveVisits } from "@/helpers/dbutils";
import Link from "next/link";


const  UserList = ({ players }: {players: User[]}) => {
  const { isAdmin } = useAuth()
  moment.locale('en-gb');
  const { t } = useTranslation('en', 'dashboard');

  const handleCopy = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    event.stopPropagation();
    const id = event.currentTarget.user_id.value || undefined
    const visits: any = await getVisits(id, "cities");
    if (!visits) {
      console.log("need to copy");
      const contentCities: any = await getPlayerData("content", id);
      if (contentCities?.visitedCities) {
        saveVisits(id, false, { cities: contentCities.visitedCities })
        
      }
    }
    
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    event.stopPropagation();
    const userFormData = event.currentTarget
    const datatosave = { 
      id: userFormData.user_id.value || undefined,
      sessionid: userFormData.sessionid.value || "undefined",
      username: userFormData.username.value || "undefined",
      my_city: userFormData.my_city.value || "",
      my_country: userFormData.my_country.value || "",
      my_flag: userFormData.my_flag.value || "",
      my_zip: userFormData.my_zip.value || "",
      totalbills: parseInt(userFormData.totalbills.value) || 0,
      totalhits: parseInt(userFormData.totalhits.value) || 0,
      email: userFormData.email.value || "undefined"
    }
    saveUser(datatosave)
  }

    if (!isAdmin) return <></>

  return (
    <>
    <h2>Users</h2>
    <table className="min-w-full text-left text-md font-light">
      <thead className="border-b font-medium dark:border-neutral-500">
        <tr className="bg-sky-200">
          <th className="px-3 md:px-6 py-4 text-center">num</th>
          <th className="px-3 md:px-6 py-2 text-center">name</th>
          <th className="px-3 md:px-6 py-2 text-center">geo</th>
          <th className="px-3 md:px-6 py-2 text-center">▥</th>
          <th className="px-3 md:px-6 py-2 text-center">cities</th>
          <th className="px-3 md:px-6 py-2 text-center">💶</th>
          <th className="px-3 md:px-6 py-2 text-center">sav</th>
        </tr>
      </thead>
      <tbody>
        {!players &&
        <tr><td><Spinner /></td></tr>
        }
        {players && players.map((p) => (
        <tr className="h-1 bg-slate-100 border-b dark:border-neutral-500 text-md hover:bg-amber-50"
        key={p.id}>
          <td>
          {p.id}<br />
          </td>
          <td>
          <>{p.my_flag} {p.username}</><br/>
          <div className="font-thin text-sm">{moment(p.date).format('DD/MM/YYYY HH:mm')}</div>
          <span className="text-xs">{p.sessionid ? p.sessionid : p.username }</span>
          </td>

          <td>
          {p.my_zip +" "+ p.my_city}<br/>
          {p.my_country}<br/>
          {p.email}<br/>
          </td>
          <td>
          {(!p.count || p.count?.communes < 1) && <>
            <Link href={{ pathname: 'cities', query: { user_id: p.id } }}>communes non récupérées</Link><br/>
          </>}
          {p.count && p.count.communes > 1 && <>
            <Link href={{ pathname: 'cities', query: { user_id: p.id } }}>Locations</Link>: {p.count?.all}<br/>
            <b>communes: {p.count?.communes}</b><br/>
            Dpt: {p.count?.departements}<br/>
          </>}

          {!!p.count?.unknowns && 
          <>
            <Link href={{ pathname: 'unknowns', query: { user_id: p.id } }}>unknowns: {p.count?.unknowns}</Link>
            <br/>
          </>}
          {p.count && !p.count?.unknowns && <>All known<br/></>}
          {!p.count && <>-<br/></>}
          <Link href={{ pathname: 'usermap', query: { user_id: p.id } }}>Carte: {p.polygons === "{}" ? "☐" : "☑"}</Link>

          </td>
          <td>
          <form onSubmit={handleCopy}>
            <input type="hidden" value={p.id} name="user_id" id="user_id" />
            <button className="btn max-w-min mx-auto m-5 p-0 sm:btn-primary sm:px-4 sm:h-[40px] cursor-pointer" id="save2" type="submit">
              <span className="sm:hidden">💾</span>
              <span className="hidden sm:inline-block">copy</span>
            </button>
            </form>
          </td>
          <td>
            💶: {p.totalbills}<br/>
            🏆: {p.totalhits}
          </td>
          {<td>
            <form onSubmit={handleSubmit}>
            <input type="hidden" value={p.id} name="user_id" id="user_id" />
            <input type="hidden" value={p.username} name="username" id="username" />
            <input type="hidden" value={p.sessionid} name="sessionid" id="sessionid" />
            <input type="hidden" value={p.email} name="email" id="email" />
            <input type="hidden" value={p.my_country} name="my_country" id="my_country" />
            <input type="hidden" value={p.my_city} name="my_city" id="my_city" />
            <input type="hidden" value={p.my_zip} name="my_zip" id="my_zip" />
            <input type="hidden" value={p.my_flag} name="my_flag" id="my_flag" />
            <input type="hidden" value={p.totalbills} name="totalbills" id="totalbills" />
            <input type="hidden" value={p.totalhits} name="totalhits" id="totalhits" />

            <button className="btn max-w-min mx-auto m-5 p-0 sm:btn-primary sm:px-4 sm:h-[40px] cursor-pointer" id="save" type="submit">
              <span className="sm:hidden">💾</span>
              <span className="hidden sm:inline-block">{t('save')}</span>
            </button>
            </form>
          </td>}
        </tr>
        ))}
      </tbody>
    </table>
    </>
  )
}

export default UserList