// import getConfig from 'next/config';

// import { userService } from 'services';

// const { publicRuntimeConfig } = getConfig();

export const fetchWrapper = {
	get: request('GET'),
	post: request('POST')
};

function request(method:string) {
    return async (url:string, body:any) => {
        const requestOptions = {
            method,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
            },
            body: body ? getRequestBody(body) : "" 
        };
        await fetch(url, requestOptions)
            .then(function (response) {
                // handle opaque response
                response.json().then(function (data) {
                    console.log('data:', data);
                    // todo set cookie
                    // setUser(data);
                    localStorage.setItem('user', JSON.stringify(data));
                    return data;
                });
            })
            .catch(function (err) {
                console.log('Fetch Error :-S', err);
            });
    }
}

function getRequestBody(body:any) {
    var bodyArray: String[] = [];
    for (var property in body) {
        var encodedKey = encodeURIComponent(property);
        var encodedValue = encodeURIComponent(body[property]);
        bodyArray.push(encodedKey + "=" + encodedValue);
    }
    return bodyArray.join("&");
}
