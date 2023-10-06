interface user {
  "user_id": string
  "sessionid"?: string
  "username": string
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

interface visited {
  "visitedCities": city[]
  "communes": string[]
  "departements": string[]
  "prefectures": string[]
  "unknown": number
  "date"?: string
}

// API eurobilltracker

interface publicUser {
  "user_id": number
  "user_name": string
  "join_date"?: string
  "home_city_name"?: string
  "home_location_name"?: string
  "home_country_name": string
  "home_city_latitude"?: number
  "home_city_longitude"?: number
  "url"?: string
  "total_notes": number
  "total_hits": number
}

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