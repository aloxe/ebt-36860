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
        console.log('Fetch ciities Error :-S', err);
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

    // const response = await fetch(`/api/eurobilltracker/?m=sessioncheck&v=2&autologin=1&PHPSESSID=${user.sessionid}`, requestOptions)
    const response = await fetch(`/api/eurobilltracker/?m=sessioncheck&v=2&autologin=1`, requestOptions)
      .catch(function (err) {
        console.log('Fetch relogin Error :-S', err);
        return null;
      });

    const loginUser = await response?.json();

    if (loginUser) {
      loginUser.date = Date.now();
    }
    return loginUser;
  }