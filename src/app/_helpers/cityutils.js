
import { sansAccent } from "../_helpers/strings"

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

  // const communes = require('@etalab/decoupage-administratif/data/communes.json')
  // const EBTLocations = require("@/app/_data/ebtlocation.json")
  console.log("matchCommunes with ", visitedCities, communes, EBTLocations);

  visitedCities.map(function (city) {
    // check same name + dept
    var foundCommune = communes.find((commune) => city.city == commune.nom
      && city.departement == commune.departement)
    city.code = foundCommune ? foundCommune.code : undefined;
    // foundCommune && console.log(city.city);
  });

  console.log("now visitedCities", visitedCities);
  visitedCities.map(function (city) {
    if (!city.code) {
      // check same name no diacritics + dept
      var foundCommune = communes.find((commune) => sansAccent(city.city) == sansAccent(commune.nom)
        && city.departement == commune.departement)
      city.code = foundCommune ? foundCommune.code : undefined;
      foundCommune && console.log(city.city + " ←→ " + foundCommune.nom);
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
      foundCommune && console.log(city.city + " is in → " + foundCommune.nom);
    }
  });

  visitedCities.map(function (city) {
    if (!city.code && city.postcodes?.length == 1) {
      // check postcode if only one
      // console.log("city=" + city.city + " " + city.postcodes[0]);
      const samePostcode = communes.filter((commune) => city.departement == commune.departement
        && hasSamePostcode(city.postcodes || [], commune.codesPostaux || []))
      if (samePostcode.length == 1) {
        city.code = samePostcode[0].code;
        city.commune = samePostcode[0].nom;
        console.log(city.postcodes[0] + "is only => " + city.city + " (" + city.nom + ")");
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
      console.log("EBT: " + city.city + " is in " + foundCommune?.nomCommune);
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
