interface User {
  "id": number
  "sessionid"?: string
  "username"?: string
  "url"?: string
  "user"?: string | User
  "my_city"?: string[]
  "my_country"?: string
  "my_flag"?: string
  "my_zip"?: string
  "totalbills"?: number
  "totalhits"?: number
  "score"?: number
  "email"?: string
  "date"?: string | Date
  "content"?: string;
  "visited"?: { content: Visited | string }
}

interface DbUser {
  "user_id": string
  "user": string
  "username"?: string
  "country"?: string
  "content"?: string
  "polygons"?: string
  "visited"?: Visited
  "date"?: string | Date
  "score"?: number
  "flag"?: string
}

interface Visited {
  "visitedCities": City[]
  "communes": string[]
  "departements": string[]
  "prefectures": string[]
  "unknown": number
  "date"?: string | number
  "userId"?: string | number
}

// API eurobilltracker
interface City {
  "code"?: string;
  "commune"?: string;
  "city": string,
  "country": string,
  "top_zipcode": string,
  "nrlocations": number,
  "postcodes": string[],
  "departement": string,
  "samePostcode"?: string[]
  "possible"?: Commune[];
  "pref"?: ""
}

// API découpage administratif
interface Commune {
    "code": string;
    "nom": string;
    "surface"?: number;
    "population"?: number;
    "codesPostaux": string[];
    "centre"?: { type: 'Point', coordinates: Array<string> };
    "contour"?: { type: 'Polygon', coordinates: Array<string> };
    "zone": 'metro' | 'com' | 'drom';
    "departement"?: { code: string, nom: string; };
    "region"?: { code: string, nom: string; };
  }

interface Departement {
    "code": string;
    "region": string;
    "chefLieu": string;
    "nom": string;
    "typeLiaison": number;
    "zone": 'metro' | 'com' | 'drom';
}

interface Region {
    "code": string;
    "chefLieu": string;
    "nom": string;
    "typeLiaison": number
    "zone": 'metro' | 'com' | 'drom';
  }