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

export function countryCodeToFlag(countrycode) {
  const offset = 127397;
  const A = 65;
  const Z = 90;
  const f = countrycode.codePointAt(0);
  const s = countrycode.codePointAt(1);

  if (countrycode.length !== 2
    || f > Z || f < A
    || s > Z || s < A)
    throw new Error('Not an alpha2 country code');

  return String.fromCodePoint(f + offset) + String.fromCodePoint(s + offset);
}

export function formatDate(date) {
  var d = new Date(date);
  return d.toLocaleString("en-GB", { year: 'numeric', month: 'long', day: 'numeric' })
}

export function compareScore( a, b ) {
  if ( a.score > b.score ){
    return -1;
  }
  if ( a.score < b.score ){
    return 1;
  }
  return 0;
}
