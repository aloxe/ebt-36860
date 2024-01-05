import prisma from "@/lib/prisma";
import { isJson } from "./strings";

// server side

// export const getUserVisited = async (id) => {
//   const response = await prisma.visited.findUnique({
//     where: {
//         user_id: id,
//     },
//   });
//   const visited = await JSON.parse(response?.content || "")
//   // return {
//   //   visited,
//   //   revalidate: 60,
//   // }
//   return visited;
// }

export const getUserPolygonsFromVisited = async (id) => {
  // TODO: change to table polygons
  const response = await prisma.visited.findUnique({
    where: {
        user_id: id,
    },
  });
  const polygons = await JSON.parse(response?.polygons || "")
  // return {
  //   polygons,
  //   revalidate: 60,
  // }
  return polygons;
}

export const getUserPolygons = async (id) => {
  console.log("getUserPolygons");
  // TODO: change to table polygons
  const response = await prisma.polygons.findUnique({
    where: {
        user_id: id,
    },
  });
  const polygons = await JSON.parse(response?.polygons || "")
  return polygons;
}

export const getUsers = async () => {
  const res = await prisma.users.findMany(
    {
    select: {
      id: true,
      date: true,
      username: true, 
      sessionid: true,
      my_city: true,
      my_zip: true,
      my_country: true,
      my_flag: true,
      totalbills: true,
      totalhits: true,
      email: true
      }
  });
  return res;
}

export const getVisitsServer = async (id, field) => {
  const fields = field.split(',');
  const res = await prisma.visits.findUnique({
    where: {
      user_id: id,
    },
    select: {
      date: fields.includes("date"),
      cities: fields.includes("cities"),
      fr: fields.includes("fr"),
    },
  });
  return res
}

export const getCountsServer = async (id, field) => {
  const fields = field.split(',');
  const res = await prisma.counts.findUnique({
    where: {
      user_id: id,
    },
    select: {
      user_id: fields.includes("user_id"),
      date: fields.includes("date"),
      communes: fields.includes("communes"),
      departements: fields.includes("departements"),
      prefectures: fields.includes("prefectures"),
      unknowns: fields.includes("unknowns"),
      count: fields.includes("count"),
    },
  });
  return res
}

// client side

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

export const getTranslations = async (lang, ns) => {
  const requestOptions = { method: 'GET' };
  const response = await fetch(`/api/translations${lang ? '/'+lang : ''}${ns ? '/'+ns : ''}`, requestOptions)
    .catch(function (err) {
      console.log('Fetch Error :-S', err);
      return null;
    });

  const dataresult = await response?.json();
  console.log("dataresult", dataresult);
  return dataresult;
}

export const saveTranslation = async (ns, key, lang, string) => {
  if (!string) {
    console.log('saveTranslation Error :-S', key);
    return null;
  };
  
  const objectToSave = { ns, key, lang, string }
  const requestOptions = {
    method: 'POST',
    body: JSON.stringify(objectToSave),
    headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8' }
  };
      await fetch(`/api/translations/`, requestOptions)
      .then(
        response => {
          if (response.status !== 200) {
            console.log("problème ", response.status);
          }
          return response;
        })
      .catch(function (err) {
        console.log('Fetch Error :-S', err);
        return null;
      });
}

export const getPlayerRole = async (userId) => {
  const requestOptions = {
    method: 'POST',
    body: JSON.stringify(userId),
    headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8' }
  };
  const response = await fetch(`/api/roles`, requestOptions)
    .catch(function (err) {
      console.log('Fetch roll Error :-S', err);
      return null;
    });
  if (!response) {
    console.log('Fetch role no result Error :-S');
    return undefined;
  }
  return await response?.json();
}

export const getRoles = async (userId) => {
  const requestOptions = { method: 'GET' };
  const response = await fetch(`/api/roles/${userId}`, requestOptions)
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

export const getVisits = async (userId, field) => {
  const requestOptions = { method: 'GET' };
  const response = await fetch(`/api/visits/${userId}${field ? "/"+field : ""}`, requestOptions)
    .catch(function (err) {
      console.log('Fetch Error :-S', err);
      return null;
    });
  const dataresult = await response?.json();
  return JSON.parse(dataresult[field]);
}

export const getCounts = async (userId, field) => {
  const requestOptions = { method: 'GET' };
  const response = await fetch(`/api/counts/${userId}${field ? "/"+field : ""}`, requestOptions)
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
  // accept db keys from columns: user | content | polygons
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
  const dataresult = await response?.json();
  if (!response || !dataresult) {
    // no response
    return undefined;}
  if (!dataresult[key] || !Object.keys(dataresult[key]).length || dataresult[key] === "undefined") {
    // response undefined
    return undefined;
  }
  if (isJson(dataresult[key])) {
    // response ok
    return JSON.parse(dataresult[key]);
  }
  return dataresult[key]
}

// export const savePlayerData = async (userId, dataToSave) => {
//   console.log("save player data with polygons");
//   console.log("savePlayerData", userId, dataToSave);
//   if (!userId) {
//     console.log('savePlayerData Error :-S', dataToSave);
//     return null;
//   };

//   const objectToSave = { userId, dataToSave }
//   const requestOptions = {
//     method: 'POST',
//     body: JSON.stringify(objectToSave),
//     headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8' }
//   };

//       await fetch(`/api/players/`, requestOptions)
//       .then(
//         response => {
//           if (response.status !== 200) {
//             console.log("problème ", response.status);
//           }
//         })
//       .catch(function (err) {
//         console.log('Fetch Error :-S', err);
//         return null;
//       });
// }

// export const getUser = async (userId) => {
//   const requestOptions = { method: 'GET' };
//   const response = await fetch(`/api/users/${userId}`, requestOptions)
//     .catch(function (err) {
//       console.log('Fetch Error :-S', err);
//       return null;
//     });
//   const dataresult = await response?.json();
//   return dataresult;
// }

export const saveUser = async (dataToSave) => {
  // const objectToSave = { dataToSave }
  const requestOptions = {
    method: 'POST',
    body: JSON.stringify(dataToSave),
    headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8' }
  };

      await fetch(`/api/users/`, requestOptions)
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

export const saveVisits = async (userId, isNew, dataToSave) => {
  if (!userId) {
    console.log('save Visits Error :-S', dataToSave);
    return null;
  };

  const objectToSave = { userId, isNew, data: dataToSave }
  const requestOptions = {
    method: 'POST',
    body: JSON.stringify(objectToSave),
    headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8' }
  };

      await fetch(`/api/visits/`, requestOptions)
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

export const saveCounts = async (userId, isNew, dataToSave) => {
  if (!userId) {
    console.log('save Counts Error :-S', dataToSave);
    return null;
  };

  const objectToSave = { userId, isNew, data: dataToSave }
  const requestOptions = {
    method: 'POST',
    body: JSON.stringify(objectToSave),
    headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8' }
  };
  await fetch(`/api/counts/`, requestOptions)
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


export const savePolygons = async (userId, dataToSave) => {
  if (!userId) {
    console.log('save Polygons Error :-S', dataToSave);
    return null;
  };

  const objectToSave = { userId, data: dataToSave }
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


