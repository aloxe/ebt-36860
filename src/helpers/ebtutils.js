import axios from "axios";

// server side

export const getPublicUser = async (id) => {
      const requestOptions = {
      method: 'GET',
      cache: 'force-cache'
    };

    const response = await fetch(`https://api.eurobilltracker.com/?m=globalstats_profile_user&v=1&user_id=${id}`, requestOptions)
      .catch(function (err) {
        console.log('get User Error :-S', err);
        return null;
      });

    const publicUser = await response?.json();
    return remapPublicUser(publicUser.data);
  }

  
  // client side

export const EBTlogin = async (login, password) => {
  const { data } = await axios.post('/api/eurobilltracker/?m=login&v=2', {
    'my_email': login,
    'my_password': password
    }, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
      }
  })
  if (data) return data
  else return null
}

export const getPostcodes = async (user, city) => {
    const responsePostcodes = await fetch(`/api/eurobilltracker/?m=myzipcodes&v=1&PHPSESSID=${user.sessionid}&city=${city.city}&country=${city.country}`,
      { cache: 'force-cache' })
      .catch(function (err) {
        console.log('Fetch zipcode Error :-S', err);
        return null;
      });
    const postcodes = await responsePostcodes?.json();
    // return array of postcodes instead of array or objects
    var postcodesArray = postcodes ? postcodes.data.map(function (el) {
      return el.zipcode;
    }) : []
    return postcodesArray;
  }

  export const getCities = async (sessionid) => {
    const requestOptions = { method: 'GET' };
    const response = await fetch(`/api/eurobilltracker/?m=mycities&v=1&PHPSESSID=${sessionid}`, requestOptions)
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

    // cookie set (autologin=1) doesn't work (same domain policy)
    // so we need sessionid
    const response = await fetch(`/api/eurobilltracker/?m=sessioncheck&v=2&autologin=1&PHPSESSID=${user.sessionid}`, requestOptions)
      .catch(function (err) {
        console.log('Fetch relogin Error :-S', err);
        return null;
      });

    const loginUser = await response?.json();
    return loginUser ?? null
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

  // utils
  const remapPublicUser = (publicUser) => {
  const user  = {
    "id": publicUser.user_id,
    "username": publicUser.user_name,
    "my_city": publicUser.home_city_name,
    "my_country": publicUser.home_country_name,
    "my_zip": publicUser.home_postal_code,
    "totalbills": publicUser.total_notes,
    "totalhits": publicUser.total_hits
  }
  return user;
}