function getRequestBody(body) {
  var bodyArray = [];
  for (var property in body) {
    var encodedKey = encodeURIComponent(property);
    var encodedValue = encodeURIComponent(body[property]);
    bodyArray.push(encodedKey + "=" + encodedValue);
  }
  return bodyArray.join("&");
}

export const EBTlogin = async (login, password) => {
  const params = {
  'my_email': login,
  'my_password': password
  };

  const requestOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
    },
    body: getRequestBody(params)
  };

  // &PHPSESSID=123456789
  const response   = await fetch('/api/eurobilltracker/?m=login&v=2', requestOptions)
    .catch(function (err) {
      console.log('Fetch Error :-S', err);
      return null;
    });

  const loginUser = await response?.json();
  if (loginUser) return loginUser
  else return null
}

export const getPostcodes = async (user, city) => {
    const responsePostcodes = await fetch(`/api/eurobilltracker/?m=myzipcodes&v=1&PHPSESSID=${user.sessionid}&city=${city.city}&country=${city.country}`)
      .catch(function (err) {
        console.log('Fetch zipcode Error :-S', err);
        return null;
      });
    const postcodes = await responsePostcodes?.json();
    // return array of postcodes instead of array or objects
    var postcodesArray = postcodes.data.map(function (el) {
      return el.zipcode;
    })
    return postcodesArray;
  }

  export const getCities = async (user) => {
      const requestOptions = {
      method: 'GET'
    };

    const response = await fetch(`/api/eurobilltracker/?m=mycities&v=1&PHPSESSID=${user.sessionid}`, requestOptions)
      .catch(function (err) {
        console.log('Fetch cities Error :-S', err);
        return null;
      });

    const cities = await response?.json();
    return cities;
  }

  export const refreshUser = async (user) => {
    const requestOptions = {
      method: 'GET',
      credentials: 'include',
    };

    // cookie set doesn't work (same domain)
    // const response = await fetch(`/api/eurobilltracker/?m=sessioncheck&v=2&autologin=1`, requestOptions)
    const response = await fetch(`/api/eurobilltracker/?m=sessioncheck&v=2&autologin=1&PHPSESSID=${user.sessionid}`, requestOptions)
      .catch(function (err) {
        console.log('Fetch relogin Error :-S', err);
        return null;
      });

    const loginUser = await response?.json();
    if (loginUser) return loginUser
    else return null
  }

    export const EBTsearch = async (user, searchTerm, what = 0) => {
      const requestOptions = {
      method: 'GET',
    };
// 
    const response = await fetch(`/api/eurobilltracker/?m=search&v=1&find=${searchTerm}&what=${what}&PHPSESSID=${user.sessionid}`, requestOptions)
      .catch(function (err) {
        console.log('Fetch relogin Error :-S', err);
        return null;
      });

    const searchResponse = await response?.json();
    if (searchResponse) return searchResponse
    else return null
  }