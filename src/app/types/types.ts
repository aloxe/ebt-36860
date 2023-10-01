interface user {
  "sessionid"?: string
  "username": string
  "my_city": string[]
  "my_country": string
  "my_zip": string
  "totalbills": number
  "totalhits": number
  "email"?: string
  "date"?: string
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
    "centre"?: { type: 'Point', coordinates: Array<string> },
    "contour"?: { type: 'Polygon', coordinates: Array<string> },
    "zone"?: 'metro',
    "departement"?: { code: string, nom: string; }, //   "departement": string;
    "region"?: { code: string, nom: string; }
  }