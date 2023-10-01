import { getPostcodes } from "@/helpers/ebtutils";
import { sansAccent } from "@/helpers/strings";

// API calls
export const fetchAllCommunes = async () => {
  // curl 'https://geo.api.gouv.fr/communes?nom=Versailles&fields=code,nom,surface,population,codesPostaux,codeDepartement,codeRegion,siren,codeEpci,epci,departement,region,centre,contour,zone'
  const response = await fetch(
      `https://geo.api.gouv.fr/communes?fields=code,nom`
    )
  const communes = await response.json()
  return communes;
}

export const fetchAllComplete = async () => {
  // curl 'https://geo.api.gouv.fr/communes?nom=Versailles&fields=code,nom,surface,population,codesPostaux,codeDepartement,codeRegion,siren,codeEpci,epci,departement,region,centre,contour,zone'
  const response = await fetch(
      `https://geo.api.gouv.fr/communes?fields=code,nom,surface,population`
    )
  const communes = await response.json()
  return communes;
}

export const fetchComplete = async (code) => {
    const response = await fetch(
      `https://geo.api.gouv.fr/communes?code=${code}&fields=code,nom,surface,population,codesPostaux,departement,region,zone`
    )
  const communes = await response.json()
    // console.log("fetch complete", code, communes[0]);
  return communes[0];
}

export const fetchGeo = async (code) => {
    const response = await fetch(
      `https://geo.api.gouv.fr/communes?code=${code}&fields=code,nom,departement,region,centre,contour`
    )
  const communes = await response.json()
    // console.log("fetch complete", code, communes[0]);
  return communes[0];
}

// operations

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

  visitedCities.map(function (city) {
    // check same name + dept
    var foundCommune = communes.find((commune) => city.city == commune.nom
      && city.departement == commune.departement)
      if (foundCommune?.chefLieu) {
        foundCommune = getChefLieu(foundCommune.chefLieu, communes)
      }
      city.code = foundCommune ? foundCommune.code : undefined; 
      city.commune = foundCommune ? foundCommune.nom : undefined;
  });

  visitedCities.map(function (city) {
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
  return refreshVisited(visitedCities)
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
  const prefectures = removeNotPrefecture(communes);
  const visitedUnknown = visitedCities.filter(city => !city.code);


  console.log("visited::: ", {
    visitedCities,
    communes,
    departements,
    prefectures,
    unknown: visitedUnknown.length,
    date: Date.now()
  });


  return {
    visitedCities,
    communes,
    departements,
    prefectures,
    unknown: visitedUnknown.length,
    date: Date.now()
  };
}

