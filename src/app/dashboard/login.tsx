'use client'

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
