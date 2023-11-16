import { getPostcodes } from "@/helpers/ebtutils";
import { sansAccent } from "@/helpers/strings";

// API calls such as:
// curl 'https://geo.api.gouv.fr/communes?nom=Versailles&fields=code,nom,surface,population,codesPostaux,codeDepartement,codeRegion,siren,codeEpci,epci,departement,region,centre,contour,zone'
  
export const fetchAllCommunes = async () => {
  const response = await fetch(
      `https://geo.api.gouv.fr/communes?fields=code,nom`,
      { cache: 'force-cache' }
    )
  const communes = await response.json()
  return communes;
}

export const fetchAllComplete = async () => {
  const response = await fetch(
      `https://geo.api.gouv.fr/communes?fields=code,nom,surface,population,codesPostaux,departement,zone`,
      { cache: 'force-cache' }
    )
  const communes = await response.json()
  return communes;
}

export const fetchComplete = async (code) => {
    const response = await fetch(
      `https://geo.api.gouv.fr/communes?code=${code}&fields=code,nom,surface,population,codesPostaux,departement,region,zone`,
      { cache: 'force-cache' }
    )
  const communes = await response.json()
    // console.log("fetch complete", code, communes[0]);
  return communes[0];
}

export const fetchPolygon = async (code) => {
    const response = await fetch(
      `https://geo.api.gouv.fr/communes?code=${code}&fields=code,nom,departement,region,centre,contour`,
      { cache: 'force-cache' }
    )
  const communes = await response.json()
  return communes[0];
}

// operations

export const getDepartement = (postcode) => (
  parseInt(postcode.substring(0,2)) < 96 ? postcode.substring(0,2) : postcode.substring(0,3)
)


export const hasSamePostcode = (cp1, cp2) => cp1.filter(cp => cp2.includes(cp)).length > 0;

export const removeDuplicateCommunes = (cities) => {
  var newcities = cities.filter((city, index, self) =>
    index === self.findIndex((c) => (
      c.code === city.code && c.commune === city.commune
    ))
  );
  return newcities;
}

export const removeDuplicateDepartements = (cities) => {
  var newcities = cities.filter((city, index, self) =>
    index === self.findIndex((c) => (
      c.departement === city.departement
    ))
  );
  return newcities;
}

export const removeNotPrefecture = (communes) => {
  const departements = require('@etalab/decoupage-administratif/data/departements.json')
  const allPrefectures = departements.map(el => el.chefLieu);
  var prefectures = communes.filter((commune) => allPrefectures.includes(commune))
  return prefectures;
}

const getChefLieu = (code, communes) => {
  // in case there is a match with a "code" of a commune déléguée
  // we return the chek lieu "commune actuelle" instead
  const chefLieu = communes.find((commune) => code === commune.code);
  return chefLieu[0];
}

export const matchCommunes = async (visitedCities, communes, EBTLocations) => {
  visitedCities.map((city) => {
    // check same name + dept
    var foundCommune = communes.find((commune) => city.city == commune.nom
      && city.departement == commune.departement)
      if (foundCommune?.chefLieu) {
        foundCommune = getChefLieu(foundCommune.chefLieu, communes)
      }
      city.code = foundCommune ? foundCommune.code : undefined; 
      city.commune = foundCommune ? foundCommune.nom : undefined;
  });

  visitedCities.map((city) => {
    if (!city.code) {
      // check same name no diacritics + dept
      var foundCommune = communes.find((commune) => sansAccent(city.city) == sansAccent(commune.nom)
        && city.departement == commune.departement)
      if (foundCommune?.chefLieu) {
        foundCommune = getChefLieu(foundCommune.chefLieu, communes)
      }
      city.code = foundCommune ? foundCommune.code : undefined;
      city.commune = foundCommune ? foundCommune.nom : undefined;
    }
  });

  visitedCities.map(function (city) {
    if (!city.code) {
      // check name included + postcode
      var possibleCommunes = communes.filter((commune) => commune.nom.includes(city.city)
        && hasSamePostcode(city.postcodes || [], commune.codesPostaux || [])
        )
      if (possibleCommunes?.length === 1) {
        var foundCommune = possibleCommunes[0].chefLieu ? getChefLieu(possibleCommunes[0].chefLieu, communes) : possibleCommunes[0];
        city.code = foundCommune.code;
        city.commune = foundCommune.nom;
        city.departement = foundCommune.departement;
      } else if (possibleCommunes?.length > 1) {
        city.possible = possibleCommunes;
      }
    }
  });

  visitedCities.map(function (city) {
    if (!city.code && city.postcodes?.length == 1) {
      // check postcode if only one
      const samePostcode = communes.filter((commune) => city.departement == commune.departement
        && hasSamePostcode(city.postcodes || [], commune.codesPostaux || []))
      if (samePostcode.length === 1) {
        var foundCommune = samePostcode[0].chefLieu ? getChefLieu(samePostcode[0].chefLieu, communes) : samePostcode[0];
        city.code = foundCommune.code;
        city.commune = foundCommune.nom;
        city.departement = foundCommune.departement;
      } else if (samePostcode?.length > 1 && !city.possible) {
        city.possible = samePostcode;
      }
    }
  });

  visitedCities.map(function (city) {
    if (!city.code) {
      // check name + dept + postcode in EBT locations
      var foundCommune = EBTLocations.find((lieu) => lieu.nom_ebt == city.city
        && hasSamePostcode(city.postcodes || [], [lieu.code_postal]))
      if (foundCommune) {
        if (foundCommune.chefLieu) foundCommune = getChefLieu(foundCommune.chefLieu, communes)
        city.code = foundCommune.code_commune;
        city.commune = foundCommune.nom_commune;
        city.departement = foundCommune.code_commune.substring(0,2);
      }
    }
  });
  return visitedCities;
  // return refreshVisited(visitedCities)
}

// export async function addPostcodes(user, citiesArray) {
//   return Promise.all(
//   citiesArray.map(async (city) => {
//     // add departement: useful french division
//     if (city.country == "France") city.departement = city.top_zipcode.substring(0,2)
//     if (city.nrlocations > 1) {
//     var postcodesArray = await getPostcodes(user, city);
//     // some cities with homonyms might return parasite postcode
//     postcodesArray.filter((postcode) => postcode.substring(0,2) === city.departement)
//     city.postcodes = postcodesArray;
//     } else {
//     city.postcodes = [city.top_zipcode];
//     }
//     return city
//   })
//   );
// }

export const processPostcodes = async (user, citiesArray) => {
  const extraCities = []
  const newCities = await Promise.all(citiesArray.map(async (city) => {
    // if there are more postcodes we fetch the others
    if (city.nrlocations > 1) {
      var postcodesArray = await getPostcodes(user, city);
      // we sort postcodes by departements ins an array
      let sort = []
      postcodesArray.forEach((postcode) => { 
        let dep = getDepartement(postcode)
        if (!sort.find(o => o.dep === dep)) {
          let zips = postcodesArray.filter(postcode => getDepartement(postcode) == dep)
          sort = [...sort, {dep, zips}];
        }
      })

      if (sort.length > 1) {
        sort.forEach((obj) => {
          if (getDepartement(top_zipcode) !== obj.dep) {
            extraCities.push(extracity = {
              city: city.city,
              country: city.country,
              top_zipcode: obj.zips[0],
              postcodes: obj.zips
            })
          } else {
            city.postcodes = obj.zips;
          }
        });
      } else {
        // only one departement
        city.postcodes = postcodesArray;
      }
    } else {
      // only one postcode
      city.postcodes = [city.top_zipcode];
    }
  }));
  console.log(newCities);
  console.log(extraCities);
  return [...newCities, ...extraCities]
}

export const refreshVisited = (visitedCities) =>  {
  const visitedKnown = visitedCities.filter(city => city.code)
  const visitedCommunes = removeDuplicateCommunes(visitedKnown);
  const communes = visitedCommunes.map(el => el.code)
  const visitedDepartements = removeDuplicateDepartements(visitedCities);
  const departements = visitedDepartements.map(el => el.departement)
  const prefectures = removeNotPrefecture(communes);
  const visitedUnknown = visitedCities.filter(city => !city.code);

  return {
    visitedCities,
    communes,
    departements,
    prefectures,
    unknown: visitedUnknown.length,
    date: Date.now()
  };
}

