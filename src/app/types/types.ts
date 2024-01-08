interface User {
  "id": string
  "sessionid"?: string
  "username"?: string
  "url"?: string
  "my_city"?: string
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
  "count"?: any
  "polygons"?: string
  "isFake"?: boolean;
}

interface Visited {
  "visitedCities": City[]
  "communes": string[]
  "departements": string[]
  "prefectures": string[]
  "unknowns"?: string[]
  "date"?: string | number
  "userId"?: string | number
}

// API eurobilltracker
interface City {
  "code"?: string;
  "commune"?: string;
  "city": string,
  "country": string,
  "top_zipcode"?: string,
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
    "chefLieu"?: string;
    "nom": string;
    "surface"?: number;
    "population"?: number;
    "codesPostaux": string[];
    "centre"?: { type: 'Point', coordinates: Array<string> };
    "contour"?: { type: 'Polygon', coordinates: Array<string> };
    "zone": 'metro' | 'com' | 'drom';
    "departement"?: { code: string, nom: string; };
    "region"?: { code: string, nom: string; };
    "altitude"?: number;
  }

  interface CommuneWithData {
    "code": string;
    "nom": string;
    "surface": number;
    "population": number;
    "centre"?: { type: 'Point', coordinates: Array<string> };
    "contour"?: { type: 'Polygon', coordinates: Array<string> };
    "altitude": number;
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