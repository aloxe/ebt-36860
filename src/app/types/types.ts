interface user {
  "id": number
  // "user_id": string
  "sessionid"?: string
  "username"?: string
  "url"?: string
  "user"?: string | user
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
  "visited"?: visited;
}

interface dbUser {
  "user_id": string
  "user"?: string
  "content"?: string
  "polygon"?: string
  "visited"?: visited
  "date"?: string | Date
  "score"?: number
}

interface visited {
  "visitedCities": city[]
  "communes": string[]
  "departements": string[]
  "prefectures": string[]
  "unknown": number
  "date"?: string
}

// API eurobilltracker

interface city {
  "code"?: string;
  "commune"?: string;
  "city": string,
  "country": string,
  "top_zipcode": string,
  "nrlocations": number,
  "postcodes": string[],
  "departement": string,
  "samePostcode"?: string[]
  "possible"?: commune[];
  "pref"?: ""
}

// API découpage administratif
interface commune {
    "code": string;
    "nom": string;
    "surface"?: number;
    "population"?: number;
    "codesPostaux": string[];
    "centre"?: { type: 'Point', coordinates: Array<string> };
    "contour"?: { type: 'Polygon', coordinates: Array<string> };
    "zone": 'metro' | 'com' | 'drom';
    "departement"?: { code: string, nom: string; }; //   "departement": string;
    "region"?: { code: string, nom: string; };
  }

interface departement {
    "code": string;
    "region": string;
    "chefLieu": string;
    "nom": string;
    "typeLiaison": number;
    "zone": 'metro' | 'com' | 'drom';
}

interface region {
    "code": string;
    "chefLieu": string;
    "nom": string;
    "typeLiaison": number
    "zone": 'metro' | 'com' | 'drom';
  }