import prisma from "@/lib/prisma";
import { isJson } from "./strings";

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

export const getPlayerData = async (key, userId) => {
  // accept keys from the db column (user, content, polygons)
  const requestOptions = {
    method: 'POST',
    body: JSON.stringify(userId),
    headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8' }
  };
  const response = await fetch(`/api/players/get`, requestOptions)
    .catch(function (err) {
      console.log('Fetch Error :-S', err);
      return null;
    });
      console.log("response", response);
      console.log("response data ", response.data);
  const dataresult = await response?.json();
  if (!response || !dataresult) {
        console.log("f rien rien so on passe à suivant");
    return undefined;}
  // console.log("dataresult", dataresult);
  // console.log("!dataresult", !dataresult);
  if (!dataresult[key] || !Object.keys(dataresult[key]).length || dataresult[key] === "undefined") {
    console.log("undefini so on passe à suivant");
    return undefined;
  }
  if (isJson(dataresult[key])) {
    return JSON.parse(dataresult[key]);
  }

  return dataresult[key]
}

export const savePlayerData = async (dataToSave) => {
  const { user, visited, polygon } = dataToSave

  const userId = user?.id || visited?.userId || polygon?.userId;
  if (!userId) {
      console.log('savePlayerData Error :-S', dataToSave);
      return null;
    };

  const userTosave = user ? user : await getPlayerData ("user", userId) || "undefined"
  const visitedTosave = visited ? visited : await getPlayerData ("content", userId) || {}
  const polygonTosave = polygon ? polygon : await getPlayerData ("polygon", userId) || {}

  const objectToSave = {
    userId: userId,
    user: userTosave,
    visited: visitedTosave,
    polygon: polygonTosave
  }
  const requestOptions = {
    method: 'POST',
    body: JSON.stringify(objectToSave),
    headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8' }
  };

  console.log("objectToSave", objectToSave);
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


  export const saveVisited = async (user, visited) => {
  console.log("saveVisited", user, visited);
  objectToSave.userId = user.id;
  objectToSave.user = user;
  objectToSave.visited = visited;
  const requestOptions = {
    method: 'POST',
    body: JSON.stringify(objectToSave),
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
