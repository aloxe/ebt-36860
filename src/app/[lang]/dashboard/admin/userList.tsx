'use client'
import { useAuth } from "@/context/authcontext";
import Spinner from "@/components/common/spinner";
import moment from "moment";
import 'moment/min/locales';
import { useTranslation } from '@/i18n/client'
import { saveUser } from "@/helpers/dbutils";


const  UserList = ({ players }: {players: User[]}) => {
  const { isAdmin } = useAuth()
  moment.locale('en-gb');
  const { t } = useTranslation('en', 'dashboard');

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
          <th className="px-3 md:px-6 py-2 text-center">session</th>
          <th className="px-3 md:px-6 py-2 text-center">geo</th>
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
          <div className="text-center font-thin text-sm">date{moment(p.date).format('DD/MM/YYYY HH:mm')}</div>
          </td>
          <td className="text-xs">
            {p.sessionid ? p.sessionid : p.username }<br/>
            {p.date?.toString()}
          </td>
          <td>
          {p.my_zip +" "+ p.my_city}<br/>
          {p.my_country}<br/>
          {p.email}<br/>
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