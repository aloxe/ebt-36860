'use client'
import { useAuth } from "@/context/authcontext";
import { EBTlogin, EBTsearch } from "@/helpers/ebtutils";
import { useRouter } from 'next/navigation';
import { useCallback, useEffect, useState } from "react";
import { useTranslation } from '@/i18n/client'

const Login = ({ lang}: {lang: string}) => {
  const { user, setUser, logout } = useAuth();
  const [userLogsIn, setUserLogsIn] = useState<boolean>(false);
  const { push } = useRouter();

  /* eslint-disable react-hooks/rules-of-hooks */
  const { t } = useTranslation(lang, 'translations')

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setUserLogsIn(true)
    const login = (event.target as HTMLInputElement).getElementsByTagName("input")[0].value
    const password = (event.target as HTMLInputElement).getElementsByTagName("input")[1].value

    const loginUser = await EBTlogin(login, password);
    if (!loginUser) {
      //TODO display error message
      console.log("login error: no user");
      return
    }
    // add missing info from EBT user service
    const searchUser = await EBTsearch(loginUser, loginUser.username, 1)
    if (searchUser.users.length = 1) {
      loginUser.id = searchUser.users[0].id
      loginUser.active = searchUser.users[0].active
    } else {
      // TODO error message for users without id?
      console.log("login error: user with no");
      loginUser.id = loginUser.username
    }
    if (loginUser) {
      loginUser.email = login;
      loginUser.date = Date.now();
      sessionStorage.setItem('user', JSON.stringify(loginUser));
      setUser(loginUser);
    }
  }

  const handleLogout = () => {
    logout()
  }

    const handleRedirect = useCallback(() => {
      push(`/${lang}/dashboard/`);
  }, [push])

  useEffect(() => {
   if (userLogsIn && user) {
    setUserLogsIn(false)
    handleRedirect();
   }
}, [userLogsIn, user, handleRedirect]);

  if (user) {
    return (
      <div className="flex items-center justify-center">
        <div className=" relative inline-block text-left dropdown">
          <button className="inline-flex justify-center w-full px-4 py-2 leading-5 text-gray-700 transition duration-150 ease-in-out focus:outline-none focus:bg-sky-100 active:text-gray-800"
            type="button" aria-haspopup="true" aria-expanded="true" aria-controls="headlessui-menu-items-117">
            <span><svg width="28px" height="20px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M12.1601 10.87C12.0601 10.86 11.9401 10.86 11.8301 10.87C9.45006 10.79 7.56006 8.84 7.56006 6.44C7.56006 3.99 9.54006 2 12.0001 2C14.4501 2 16.4401 3.99 16.4401 6.44C16.4301 8.84 14.5401 10.79 12.1601 10.87Z" stroke="#292D32" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path> <path d="M7.15997 14.56C4.73997 16.18 4.73997 18.82 7.15997 20.43C9.90997 22.27 14.42 22.27 17.17 20.43C19.59 18.81 19.59 16.17 17.17 14.56C14.43 12.73 9.91997 12.73 7.15997 14.56Z" stroke="#292D32" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path> </g></svg></span>
            <svg className="w-5 h-5 ml-2 -mr-1" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
          </button>
          <div className="opacity-0 invisible dropdown-menu transition-all duration-300 transform origin-top-right -translate-y-2 scale-95">
            <div className="absolute right-0 w-56 mt-2 origin-top-right bg-white border border-gray-200 divide-y divide-gray-100 rounded-md shadow-lg outline-none" aria-labelledby="headlessui-menu-button-1" id="headlessui-menu-items-117" role="menu">
              <div className="px-4 py-3">
                <p className="text-sm leading-5">{t("signed-in-as")}</p>
                <p className="text-sm font-medium leading-5 text-gray-900 truncate">{ user.username || "¿ʔ" }</p>
              </div>
              <div className="py-1">
                <button onClick={handleLogout} className="text-gray-700 flex justify-between w-full px-4 py-2 text-sm leading-5 text-left" role="menuitem" >{t("sign-out")}</button>
              </div>
              <div className="py-1">
                <a href={`/${lang}/dashboard/`} className="text-gray-700 flex justify-between w-full px-4 py-2 text-sm leading-5 text-left" role="menuitem" >{t("your-dashboard")}</a>
              </div>
            </div>
          </div>
        </div>
      </div>
      );
    }
  return (
    <div className="flex items-center justify-center">
      <div className=" relative inline-block text-left dropdown">
        <button className="inline-flex justify-center w-full px-4 py-2 text-md md:text-lg font-medium leading-5 text-gray-700 transition duration-150 ease-in-out focus:outline-none focus:bg-sky-100 active:text-gray-800"
          type="button" aria-haspopup="true" aria-expanded="true" aria-controls="headlessui-menu-items-117">
            <span>{t("login")}</span>
          <svg className="w-5 h-5 ml-2 -mr-1" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
          </button>
          <div className="opacity-0 invisible dropdown-menu transition-all duration-300 transform origin-top-right -translate-y-4 scale-95">
            <div className="absolute right-0 w-80 mt-1 origin-top-right bg-white border border-gray-200 divide-y divide-gray-100 rounded-md shadow-lg outline-none" aria-labelledby="headlessui-menu-button-1" id="headlessui-menu-items-117" role="menu">
              <div className="form-row font-extralight text-xs">
              {t("use-your-credentials")}
              </div>
              <form onSubmit={handleSubmit}>
                <div className="form-row">
                  <label className="form-label">{t("email")}</label>
                  <input name="username" type="text" className="form-input" />
                </div>
                <div className="form-row">
                  <label className="form-label">{t("password")}</label>
                  <input name="password" type="password" className="form-input" />
                </div>
                <button disabled={false} className="btn btn-primary rounded-lg text-lg font-medium">
                  {false && <span className="spinner-border spinner-border-sm me-1"></span>}
                  {t("login")}
                </button>
              </form>
          </div>
        </div>
      </div>
      </div>
    )
}

export default Login;