'use client'
import { createContext, useContext, useState, useEffect } from 'react'

interface user {
  "sessionid": string
  "username": string
  "my_city": string[]
  "my_country": string
  "my_zip": string
  "totalbills": number
  "totalhits": number
  "email": string
  "date"?: string
}

export const AuthContext = createContext<any>(null)

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<user | undefined>(undefined);
  const [visited, setVisited] = useState<any>(undefined);
  // const storeUser = typeof window !== 'undefined' && JSON.parse(localStorage.getItem('user') || "{}");
  // storeUser.username && setUser(storeUser);
  // console.log(storeUser);


  useEffect(() => {
    console.log("-o-o-o use effect -o-o-o");
    
    // const storeVisited = typeof window !== 'undefined' && JSON.parse(localStorage.getItem('visited') || "{}");
    
    // storeVisited.visitedUnknown && setUser(storeVisited);
  }, [])

  return (
    <AuthContext.Provider value={{ user, setUser, visited, setVisited }}>
      { children }
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)