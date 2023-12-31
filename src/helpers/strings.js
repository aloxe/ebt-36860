// Ascii language manipulation 
export function sansAccent(str) {
  if (!str) return null;
  str = str.normalize("NFD").replace(/\p{Diacritic}/gu, "");
  str = str.replace("œ", "oe");
  str = str.replace("æ", "ae");
  str = str.replace("Œ", "OE");
  str = str.replace("Æ", "AE");
  str = str.replace(/-/g, " ");
  return str.toLowerCase();
}

export function addSauPluriel(value) {
  return value && value > 1 ? "s" : "";
}

export function getUserFlag(country) {
    var countries = require("i18n-iso-countries");
    let alpha2 = countries.getAlpha2Code(country, "en")
    return countryCodeToFlag(alpha2);  
}

export function countryCodeToFlag(countrycode) {
    if (countrycode?.length !== 2) return;


  const offset = 127397;
  const A = 65;
  const Z = 90;
  const f = countrycode.codePointAt(0);
  const s = countrycode.codePointAt(1);

  if (f > Z || f < A || s > Z || s < A)
    throw new Error('Not an alpha2 country code');

  return String.fromCodePoint(f + offset) + String.fromCodePoint(s + offset);
}

// Json 
export function isJson(str) {
    try {
        JSON.parse(str);
    } catch (e) {
        return false;
    }
    return true;
}

// results
  export function compareScore( a, b ) {
  if ( a.score > b.score ){
    return -1;
  }
  if ( a.score < b.score ){
    return 1;
  }
  return 0;
}
