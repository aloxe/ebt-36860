import { getPostcodes } from "@/helpers/ebtutils";
import { sansAccent } from "@/helpers/strings";

// API calls such as:
// curl 'https://geo.api.gouv.fr/communes?nom=Versailles&fields=code,nom,surface,population,codesPostaux,codeDepartement,codeRegion,siren,codeEpci,epci,departement,region,centre,contour,zone'

export const fetchAllComplete = async () => {
  const response = await fetch(
      `https://geo.api.gouv.fr/communes?fields=code,nom,surface,population,codesPostaux,departement,zone`,
      { cache: 'force-cache' }
    )
  const communes = await response.json()
  return communes;
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

export const getRegions = (departements) => {
  const deptsWithDomTom = require('@etalab/decoupage-administratif/data/departements.json')
  const deptsWithDomTomUser = deptsWithDomTom.filter(item => departements.includes(item.code))
  const regionsdpt = deptsWithDomTomUser.map(item => item.region)
  // remove duplicates
  var regions = regionsdpt.filter((reg, index, self) =>
    index === self.findIndex((r) => (r === reg))
  );
  return regions
}

export const getDepartement = (code) => {
  if (parseInt(code.substring(0,2)) === 20) {
    // les départements de Corse (postcode)
    return parseInt(code.substring(2,3)) < 2 ? "2A" : "2B"
  }
  return parseInt(code.substring(0,2)) < 96 ? code.substring(0,2) : code.substring(0,3)
}

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

export const getCommuneFromCode = (code, communes) => {
  const foundCommune = communes.find((commune) => code === commune.code);
  return foundCommune;
}

export const getGeoScore = (allCommunes, communes) => {

  const inseeAltitude = require('@/data/correspondance-code-insee-altitude-2013.json')
  const inseeSurface = require('@/data/communes-surface-2019.json')
  const visitedCommunes = allCommunes.filter(c => communes.includes(c.code)).map(c => {
    let surface = inseeSurface.find(el => el.code === c.code)?.surface
    surface = surface ? surface / 100 : 0;
    return {
      code: c.code,
      nom: c.nom,
      population: c.population ?? 0,
      surface,
      altitude: parseInt(inseeAltitude.find(el => el.code === c.code)?.altitude) ?? 0 }
  })

  const visitedCommunesPop = visitedCommunes.map(el => el.population || 0)
  const visitedPop = visitedCommunesPop.reduce((buf, a) => buf + a) || 0

  const visitedCommunesSurf = visitedCommunes.map(el => el.surface || 0)
  const visitedSurf = visitedCommunesSurf.reduce((a, b) => a + b) || 0

  const visitedAlt = visitedCommunes.filter(c => c.altitude)
  const visitedAltMoyenne = (visitedAlt.reduce((a, b) => a + b.altitude, 0)) / visitedAlt.length

  return { visitedPop, visitedSurf, visitedAltMoyenne }
}

export const matchCommunes = async (visitedCities, communes, EBTLocations) => {

  visitedCities.map((city) => {
    if (!city.code) {
      // check same name no diacritics + dept
      var foundCommune = communes.find((commune) => sansAccent(city.city) == sansAccent(commune.nom)
        && getDepartement(city.postcodes[0]) === commune.departement)
      if (foundCommune?.chefLieu) {
        foundCommune = getCommuneFromCode(foundCommune.chefLieu, communes)
      }
      if (foundCommune) {
        city.code = foundCommune.code
        city.commune = foundCommune.nom
        city.departement = foundCommune.departement
      }
    }
  });

    visitedCities.map((city) => {
      if (!city.code) {
        // check same name + postcode (if dep ≠ postcode)
        var foundCommune = communes.find((commune) =>  sansAccent(city.city) == sansAccent(commune.nom)
        && commune.codesPostaux && hasSamePostcode(city.postcodes, commune.codesPostaux))
        if (foundCommune?.chefLieu) {
          // chefLieu of commune is the real commune
          // we found a former commune or commune déléguée
          // we will return the chek lieu "commune actuelle" instead
          foundCommune = getCommuneFromCode(foundCommune.chefLieu, communes)
        }
        if (foundCommune) {
          city.code = foundCommune.code
          city.commune = foundCommune.nom
          // we add departement from official commune
          // as the postcode might not be right
          city.departement = foundCommune.departement
        }
      }
    });
  visitedCities.map(function (city) {
    if (!city.code) {
      // check name included + postcode
      var possibleCommunes = communes.filter((commune) => commune.nom.includes(city.city)
        && (commune.codesPostaux && commune.codesPostaux?.includes(city.top_zipcode) || hasSamePostcode(city.postcodes || [], commune.codesPostaux || []))
        )
      if (possibleCommunes?.length === 1) {
        var foundCommune = possibleCommunes[0].chefLieu ? getCommuneFromCode(possibleCommunes[0].chefLieu, communes) : possibleCommunes[0];
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
      const samePostcode = communes.filter((commune) => getDepartement(city.postcodes[0]) === commune.departement
        && hasSamePostcode(city.postcodes || [], commune.codesPostaux || []))
      if (samePostcode.length === 1) {
        var foundCommune = samePostcode[0].chefLieu ? getCommuneFromCode(samePostcode[0].chefLieu, communes) : samePostcode[0];
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
      // check name + postcode in EBT locations
      var foundCommune = EBTLocations.find((lieu) => lieu.nom_ebt == city.city
        && hasSamePostcode(city.postcodes || [], [lieu.code_postal]))
      if (foundCommune) {
        if (foundCommune.chefLieu) foundCommune = getCommuneFromCode(foundCommune.chefLieu, communes)
        city.code = foundCommune.code_commune;
        city.commune = foundCommune.nom_commune;
        city.departement = getDepartement(foundCommune.code_commune)
      }
    }
  });
  return visitedCities;
}

export const processPostcodes = async (user, citiesArray) => {
  const extraCities = []
  const newCities = await Promise.all(citiesArray.map(async (city) => {
    // if there are more postcodes we fetch the others
    if (city.nrlocations > 1) {
      var postcodesArray = await getPostcodes(user, city);
      // we sort postcodes by departements ins an array
      let sort = []
      // if we can't fetch postcodes, stop here
      if (postcodesArray.length <= 0) {
        city.postcodes = [city.top_zipcode];
        return city;
      }
      postcodesArray.forEach((postcode) => {
        let dep = getDepartement(postcode)
        if (!sort.find(o => o.dep === dep)) {
          let zips = postcodesArray.filter(postcode => getDepartement(postcode) == dep)
          sort = [...sort, {dep, zips}];
        }
      })

      if (sort.length > 1) {
        sort.forEach((obj) => {
          if (getDepartement(city.top_zipcode) !== obj.dep) {
            extraCities.push({
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
    return city;
  }));
  return [...newCities, ...extraCities]
}

export const refreshVisited = (visitedCities) =>  {
  const visitedKnown = visitedCities.filter(city => city.code)
  const visitedCommunes = removeDuplicateCommunes(visitedKnown);
  const communes = visitedCommunes.map(el => el.code)
  const visitedDepartements = removeDuplicateDepartements(visitedCommunes);
  const departements = visitedDepartements.map(el => el.departement)
  const prefectures = removeNotPrefecture(communes);
  const visitedUnknowns = visitedCities.filter(city => !city.code);

  return {
    visitedCities,
    communes,
    departements,
    prefectures,
    unknowns: visitedUnknowns,
    date: Date.now()
  };
}
