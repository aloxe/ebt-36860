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

  useEffect(() => {
    console.log("-o-o-o use effect -o-o-o" , user, visited);
    if (!user) {
      const storeUser = typeof window !== 'undefined' && JSON.parse(localStorage.getItem('user') || "{}");
      storeUser.username && setUser(storeUser);
    }
      if (!visited) {
      const storeVisited = typeof window !== 'undefined' && JSON.parse(localStorage.getItem('visited') || "{}");
      storeVisited.date && setVisited(storeVisited);
    }
  }, [user, visited])

  return (
    <AuthContext.Provider value={{ user, setUser, visited, setVisited }}>
      { children }
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)