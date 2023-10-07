import prisma from "@/lib/prisma";

//server side

export const getUserVisited = async (id) => {
  const response = await prisma.visited.findUnique({
    where: {
        user_id: id,
    },
  });
  const visited = await JSON.parse(response?.content || "")
  return visited;
}
export const getUserPolygons = async (id) => {
  const response = await prisma.visited.findUnique({
    where: {
        user_id: id,
    },
  });
  const polygons = await JSON.parse(response?.polygons || "")
  return polygons;
}

export const getUsers = async () => {
  const res = await prisma.visited.findMany();
  return res;
}

//client side

function getRequestBodyQuery(body) {
  var bodyArray = [];
  for (var property in body) {
    var encodedKey = encodeURIComponent(property);
    var encodedValue = encodeURIComponent(body[property]);
    bodyArray.push(encodedKey + "=" + encodedValue);
  }
  return bodyArray.join("&");
}

export const getEBTlocation = async () => {
  const requestOptions = { method: 'GET' };
  const response = await fetch(`/api/locations`, requestOptions)
    .catch(function (err) {
      console.log('Fetch Error :-S', err);
      return null;
    });
  const dataresult = await response?.json();
  return dataresult;
}

export const saveEBTlocation = async (newLocation) => {
  const requestOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
    }
  };
  const requestDetail = getRequestBodyQuery(newLocation)

  // api bellow writting to DB EBT locations (see route.js)
  const response = await fetch(`/api/locations/?${requestDetail}`, requestOptions)
    .catch(function (err) {
      console.log('Fetch Error :-S', err);
      return null;
    });
  const dataresult = await response?.json();
  return dataresult;
}

export const getAllVisited = async () => {
  const requestOptions = { method: 'GET' };
  const response = await fetch(`/api/players`, requestOptions)
    .catch(function (err) {
      console.log('Fetch Error :-S', err);
      return null;
    });
  const dataresult = await response?.json();
  return dataresult;
}

export const getVisited = async (userId) => {
  const requestOptions = { method: 'GET' };
  const response = await fetch(`/api/players/${userId}`, requestOptions)
    .catch(function (err) {
      console.log('Fetch Error :-S', err);
      return null;
    });
  const dataresult = await response?.json();
  return dataresult;
}

export const getPolygons = async (userId) => {
  const requestOptions = { method: 'GET' };
  const response = await fetch(`/api/polygons/${userId}`, requestOptions)
    .catch(function (err) {
      console.log('Fetch Error :-S', err);
      return null;
    });
  const dataresult = await response?.json();
  return dataresult;
}

  export const saveVisited = async (user, visited) => {
  visited.userId = user.id;
  visited.username = user.username;
  const requestOptions = {
    method: 'POST',
    body: JSON.stringify(visited),
    headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8' }
  };

      await fetch(`/api/players/`, requestOptions)
      .then(
        response => {
          if (response.status !== 200) {
            console.log("problème ", response.status);
          }
        })
      .catch(function (err) {
        console.log('Fetch Error :-S', err);
        return null;
      });
}

  export const savePolygons = async (objectToSave) => {
  const requestOptions = {
    method: 'POST',
    body: JSON.stringify(objectToSave),
    headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8' }
  };

      await fetch(`/api/polygons/`, requestOptions)
      .then(
        response => {
          if (response.status !== 200) {
            console.log("problème ", response.status);
          }
        })
      .catch(function (err) {
        console.log('Fetch Error :-S', err);
        return null;
      });
}
