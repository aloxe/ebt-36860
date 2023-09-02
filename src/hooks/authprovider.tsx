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
  const [cities, setCities] = useState<any>(undefined);
  const [visited, setVisited] = useState<any>(undefined);

  useEffect(() => {
    if (!user) {
      const storeUser = typeof window !== 'undefined' && JSON.parse(localStorage.getItem('user') || "{}");
      storeUser.username && setUser(storeUser);
    }
    if (!cities) {
      const storeCities = typeof window !== 'undefined' && JSON.parse(localStorage.getItem('cities') || "{}");
      storeCities.data && setCities(storeCities);
    }
    if (!visited) {
      const storeVisited = typeof window !== 'undefined' && JSON.parse(localStorage.getItem('visited') || "{}");
      storeVisited.date && setVisited(storeVisited);
    }
  }, [user, cities, visited])

    const logout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('cities');
    localStorage.removeItem('visited');
    setUser(undefined)
  }

  return (
    <AuthContext.Provider value={{ user, setUser, cities, setCities, visited, setVisited, logout }}>
      { children }
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)