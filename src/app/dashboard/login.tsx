'use client'

// import { FormEventHandler } from "react";

export function Login() {

	// TODO handle state and errors from https://jasonwatmore.com/next-js-13-mongodb-user-registration-and-login-tutorial-with-example-app
	const formState = { isSubmitting: false };

	const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		// Preventing the page from reloading
		event.preventDefault();
		// const  [input] = e.target.children
		console.log("click", event.target.getElementsByTagName("input")[0].value);
		console.log("click", event.target.getElementsByTagName("input")[1].value);
		
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