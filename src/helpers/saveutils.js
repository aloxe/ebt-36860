function getRequestBodyQuery(body) {
  var bodyArray = [];
  for (var property in body) {
    var encodedKey = encodeURIComponent(property);
    var encodedValue = encodeURIComponent(body[property]);
    bodyArray.push(encodedKey + "=" + encodedValue);
  }
  return bodyArray.join("&");
}

export const saveEBTlocation = async (newLocation) => {
  const requestOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
    }
  };
  const requestDetail = getRequestBodyQuery(newLocation)

  // api bellow is rewritting to EBTlocations (see route.js)
  const response = await fetch(`/api/locations/?${requestDetail}`, requestOptions)
    .catch(function (err) {
      console.log('Fetch Error :-S', err);
      return null;
    });

  const dataresult = await response?.json();
  return dataresult;
}



  export const saveVisited= async (userId, visited) => {
  console.log("saving visited");
  console.log(Date().toLocaleString());

  visited.userId = userId;
  const requestOptions = {
    method: 'POST',
    body: JSON.stringify(visited),
    headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8' }
  };

      const response = await fetch(`/api/players/`, requestOptions)
      .then(
        response => {
          if (response.status === 200) {
            console.log("visited saved");
            console.log(Date().toLocaleString());
          } else {
            console.log("problème ", response.status);
          }
        })
      .catch(function (err) {
        console.log('Fetch Error :-S', err);
        return null;
      });
}
