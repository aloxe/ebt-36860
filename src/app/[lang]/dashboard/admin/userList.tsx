'use client'
import { useAuth } from "@/context/authcontext";
import Spinner from "@/components/common/spinner";
import moment from "moment";
import 'moment/min/locales';
import { isJson } from "@/helpers/strings";
import { useTranslation } from '@/i18n/client'


const  UserList = ({ players }: {players: DbUser[]}) => {
  const { isAdmin } = useAuth()
  moment.locale('en-gb');
  const { t } = useTranslation('en', 'dashboard');

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    event.stopPropagation();
    console.log(event.target.my_flag.value + " " + event.target.username.value);
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
          <>{p.flag} {p.username}</><br/>
          <div className="text-center font-thin text-sm">date{moment(p.date).format('DD/MM/YYYY HH:mm')}</div>
          </td>
          <td className="text-xs">
            {isJson(p.user) ? JSON.parse(p.user).sessionid : p.user }<br/>
            {isJson(p.user) ? JSON.parse(p.user).date : '' }
          </td>
          <td>
          {isJson(p.user) && JSON.parse(p.user).my_zip +" "+ JSON.parse(p.user).my_city}<br/>
          {isJson(p.user) && JSON.parse(p.user).my_country}<br/>
          {isJson(p.user) && JSON.parse(p.user).email}

          </td>
          <td>
          💶: {isJson(p.user) && JSON.parse(p.user).totalbills}<br/>
          🏆: {isJson(p.user) && JSON.parse(p.user).totalhits}
          </td>
          {<td>
            <form onSubmit={handleSubmit}>
            <input type="hidden" value={p.id} name="id" id="id" />
            <input type="hidden" value={p.username} name="username" id="username" />
            <input type="hidden" value={isJson(p.user) ? JSON.parse(p.user).sessionid : p.user } name="sessionid" id="sessionid" />
            <input type="hidden" value={isJson(p.user) && JSON.parse(p.user).email} name="email" id="email" />
            <input type="hidden" value={isJson(p.user) && JSON.parse(p.user).my_country} name="my_country" id="my_country" />
            <input type="hidden" value={isJson(p.user) && JSON.parse(p.user).my_city} name="my_city" id="my_city" />
            <input type="hidden" value={isJson(p.user) && JSON.parse(p.user).my_zip} name="my_zip" id="my_zip" />
            <input type="hidden" value={p.flag} name="my_flag" id="my_flag" />
            <input type="hidden" value={isJson(p.user) && JSON.parse(p.user).totalbills} name="totalbills" id="totalbills" />
            <input type="hidden" value={isJson(p.user) && JSON.parse(p.user).totalhits} name="totalhits" id="totalhits" />

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