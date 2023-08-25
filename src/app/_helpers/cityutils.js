import { sansAccent } from "../_helpers/strings"
import { getPostcodes } from "../_helpers/ebtutils"

export const hasSamePostcode = (cp1, cp2) => cp1.filter(cp => cp2.includes(cp)).length > 0;

export const removeDuplicateCommunes = (cities) => {
  var newcities = cities.filter((city, index, self) =>
    index === self.findIndex((c) => (
      c.code === city.code && c.commune === city.commune
    ))
  );
  return newcities;
}

export const matchCommunes = async (visitedCities, communes, EBTLocations) => {

  console.log("matchCommunes with ", visitedCities, communes, EBTLocations);

  visitedCities.map(function (city) {
    // check same name + dept
    // console.log(city.city + " " + city.departement);
    var foundCommune = communes.find((commune) => city.city == commune.nom
      && city.departement == commune.departement)
    city.code = foundCommune ? foundCommune.code : undefined;
    // foundCommune && console.log("★★★ " + city.city);
  });

  visitedCities.map(function (city) {
    if (!city.code) {
      // check same name no diacritics + dept
      var foundCommune = communes.find((commune) => sansAccent(city.city) == sansAccent(commune.nom)
        && city.departement == commune.departement)
      city.code = foundCommune ? foundCommune.code : undefined;
      // foundCommune && console.log(city.city + " ←→ " + foundCommune.nom);
    }
  });

  visitedCities.map(function (city) {
    if (!city.code) {
      // check name included + dept + postcode
      var foundCommune = communes.find((commune) => commune.nom.includes(city.city)
        && city.departement == commune.departement
        && hasSamePostcode(city.postcodes || [], commune.codesPostaux || []))
      city.code = foundCommune ? foundCommune.code : undefined;
      city.commune = foundCommune ? foundCommune.nom : undefined;
      // foundCommune && console.log(city.city + " is in → " + foundCommune.nom);
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
        // console.log(city.postcodes[0] + " is only => " + city.city + " (" + city.commune + ")");
      }
    }
  });

  visitedCities.map(function (city) {
    if (!city.code) {
      // check name + dept + postcode in EBT locations
      var foundCommune = EBTLocations.lieux.find((lieu) => lieu.nomEBT == city.city
        && hasSamePostcode(city.postcodes || [], [lieu.codePostal]))
      city.code = foundCommune ? foundCommune.codeCommune : undefined;
      city.commune = foundCommune ? foundCommune.nomCommune : undefined;
      // console.log("EBT: " + city.city + " is in " + foundCommune?.nomCommune);
    }
  });

  const visitedKnown = visitedCities.filter(city => city.code)
  const visitedCommunes = removeDuplicateCommunes(visitedKnown);
  const visitedUnknown = visitedCities.filter(city => !city.code)

  const visited = {
    visitedCities,
    visitedKnown,
    visitedCommunes,
    visitedUnknown,
    date: Date.now()
  }
  console.log(visited);
return visited;
}

// export function addPostcodes(citiesArray: Array<city>): Promise<any> {
//   return Promise.all(
//   citiesArray.map(async (city: city) => {
export function addPostcodes(user, citiesArray) {
  return Promise.all(
  citiesArray.map(async (city) => {
    if (city.nrlocations > 1) {
    var postcodesArray = await getPostcodes(user, city);
    city.postcodes = postcodesArray;
    } else {
    city.postcodes = [city.top_zipcode];
    }
  // useerful french division
    if (city.country == "France") city.departement = city.top_zipcode.substring(0,2)
    return city
  })
);
}