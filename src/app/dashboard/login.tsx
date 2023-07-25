'use client'

// import { FormEventHandler } from "react";

export function Login() {

	// TODO handle state and errors from https://jasonwatmore.com/next-js-13-mongodb-user-registration-and-login-tutorial-with-example-app
	const formState = { isSubmitting: false };

	async function checkuser(username: string, password: string) {
		const details: { [key: string]: string } = {
        'my_email': username,
        'my_password': password
    } as const;


		var formBody: String[] = [];
		for (var property in details) {
			var propertyst = property.toString()
      var encodedKey = encodeURIComponent(property);
      var encodedValue = encodeURIComponent(details[property]);
      formBody.push(encodedKey + "=" + encodedValue);
    }
    let formBodyTxt = formBody.join("&");

		// TODO: use https://stackoverflow.com/questions/65058598/nextjs-cors-issue to avoid CORS
		const response = await fetch('https://api.eurobilltracker.com/?m=login&v=2&PHPSESSID=123456789', {
			method: 'POST',
			// mode: 'no-cors',
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
			},
			body: formBodyTxt
		})
		.then(function (response) {
			// handle opaque response
			console.log("login response ", response);
			response.text().then(function (data) {
				console.log('data:' + data);
			});
		})
		.catch(function (err) {
			console.log('Fetch Error :-S', err);
		});

		// const user = await response.text();


		// return user;
		// const cityResponse = await fetch(`https://api.eurobilltracker.com/?m=mycities&v=1&PHPSESSID=${user.sessionid}`)
		// console.log("cities response", cityResponse);
		// const cities = await cityResponse.json();
		// console.log("cities data", cities);

}

	const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
		// Preventing the page from reloading
		event.preventDefault();

		const login = (event.target as HTMLInputElement).getElementsByTagName("input")[0].value
		const password = (event.target as HTMLInputElement).getElementsByTagName("input")[1].value
		console.log("click", login);

		const user = await checkuser(login, password)
		console.log("login data", user);

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
