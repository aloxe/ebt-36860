'use client'

// import { BehaviorSubject } from 'rxjs';
import { useState } from "react";
import { fetchWrapper } from "../helpers/fetch-wrapper";

export function Login() {



    // TODO handle state and errors from https://jasonwatmore.com/next-js-13-mongodb-user-registration-and-login-tutorial-with-example-app
    const formState = { isSubmitting: false };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        // Preventing the page from reloading
        event.preventDefault();

        const login = (event.target as HTMLInputElement).getElementsByTagName("input")[0].value
        const password = (event.target as HTMLInputElement).getElementsByTagName("input")[1].value
        console.log("click", login);
        const params = {
            'my_email': login,
            'my_password': password
        };
        const user:any = await fetchWrapper.post('/api/eurobilltracker/?m=login&v=2&PHPSESSID=123456789', params);

        if (user) {
            console.log("we have user", user);
        } else {
            console.log("not a user");
        }
	}

    const user = typeof window !== 'undefined' && JSON.parse(localStorage.getItem('user') || "");
    const isLoggedIn = user && user !== "";
    if (isLoggedIn) {
        return (
            <div>
                <button id="dropdownDefaultButton" data-dropdown-toggle="dropdown" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" type="button">
                    Welcome {user.username} <svg className="w-2.5 h-2.5 ml-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 4 4 4-4"/>
                    </svg>
                </button>
                <div id="dropdown" className="z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700">
                    <ul className="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownDefaultButton">
                        <li><a href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                            Logout</a></li>
                        <li><a href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                            Stats</a></li>
                    </ul>
                </div>
            </div>
        )
    }

	return (
		<form onSubmit={handleSubmit}>
			<div className="form-row">
				<label className="form-label">Username</label>
				<input name="username" type="text" className="form-input" />
			</div>
			<div className="form-row">
				<label className="">Password</label>
				<input name="password" type="password" className="form-input" />
			</div>
			<button disabled={formState.isSubmitting} className="btn btn-primary rounded-lg">
				{formState.isSubmitting && <span className="spinner-border spinner-border-sm me-1"></span>}
				Login
			</button>
		</form>
	);
}
