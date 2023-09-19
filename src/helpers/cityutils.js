import { sansAccent } from "@/helpers/strings"
import { getPostcodes } from "@/helpers/ebtutils"

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

export const removeDuplicateRegions = (depRegions) => {
  var newdepRegions = depRegions.filter((dept, index, self) =>
    index === self.findIndex((d) => (
      d.regionCode === dept.regionCode
    ))
  );
  return newdepRegions;
}

export const removeDuplicatePrefectures = (cities) => {
  var newcities = cities.filter((city, index, self) =>
    !!city.pref &&
    index === self.findIndex((c) => (
      c.pref === city.pref
    ))
  );
  return newcities;
}

export const matchCommunes = async (visitedCities, communes, EBTLocations) => {

  visitedCities.map(function (city) {
    // check same name + dept
    var foundCommune = communes.find((commune) => city.city == commune.nom
      && city.departement == commune.departement)
    city.code = foundCommune ? foundCommune.code : undefined;
    city.commune = foundCommune ? foundCommune.nom : undefined;
  });

  visitedCities.map(function (city) {
    if (!city.code) {
      // check same name no diacritics + dept
      var foundCommune = communes.find((commune) => sansAccent(city.city) == sansAccent(commune.nom)
        && city.departement == commune.departement)
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
      if (possibleCommunes?.length == 1) {
        city.code = possibleCommunes[0].code;
        city.commune = possibleCommunes[0].nom;
        city.departement = possibleCommunes[0].departement;
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
      if (samePostcode.length == 1) {
        city.code = samePostcode[0].code;
        city.commune = samePostcode[0].nom;
        city.departement = samePostcode[0].departement;
      } else if (samePostcode?.length > 1 && !city.possible) {
        city.possible = samePostcode;
      }
    }
  });

  visitedCities.map(function (city) {
    if (!city.code) {
      // check name + dept + postcode in EBT locations
      var foundCommune = EBTLocations.lieux.find((lieu) => lieu.nomEBT == city.city
        && hasSamePostcode(city.postcodes || [], [lieu.codePostal]))
      if (foundCommune) {
        city.code = foundCommune.codeCommune;
        city.commune = foundCommune.nomCommune;
        city.departement = foundCommune.codeCommune.substring(0,2);
      }
    }
  });
  return refreshVisited(visitedCities)
}

export const matchPrefectures = async (visitedCities, departements) => {
  visitedCities.map(function (city) {
  let foundPref = departements.find((dep) => city.commune == dep.prefecture)
    city.pref = foundPref ? foundPref.departmentCode : undefined;
  });
  const visitedPrefectures = removeDuplicatePrefectures(visitedCities);
  const visited =  refreshVisited(visitedCities);
  visited.prefectures = visitedPrefectures.length;
  return visited;
}

export function addPostcodes(user, citiesArray) {
  return Promise.all(
  citiesArray.map(async (city) => {
    if (city.nrlocations > 1) {
    var postcodesArray = await getPostcodes(user, city);
    city.postcodes = postcodesArray;
    } else {
    city.postcodes = [city.top_zipcode];
    }
  // add departement: useful french division
    if (city.country == "France") city.departement = city.top_zipcode.substring(0,2)
    return city
  })
  );
}

export const refreshVisited = (visitedCities) =>  {
  const visitedKnown = visitedCities.filter(city => city.code)
  const visitedCommunes = removeDuplicateCommunes(visitedKnown);
  const communes = visitedCommunes.map(el => el.code)
  const visitedDepartements = removeDuplicateDepartements(visitedCities);
  const departements = visitedDepartements.map(el => el.departement)
  const visitedUnknown = visitedCities.filter(city => !city.code);

  // console.log({
  //   visitedCities,
  //   communes,
  //   departements,
  //   unknown: visitedUnknown.length,
  //   date: Date.now()
  // });
  return {
    visitedCities,
    communes,
    departements,
    unknown: visitedUnknown.length,
    date: Date.now()
  };
}

