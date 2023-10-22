'use client'
import { savePlayerData } from '@/helpers/dbutils';
import { createContext, useContext, useEffect, useState } from 'react';

export const AuthContext = createContext<any>(null)

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | undefined>(undefined);
  const [cities, setCities] = useState<City[] | undefined>(undefined);
  const [visited, setVisited] = useState<Visited | undefined>(undefined);

  useEffect(() => {
    if (!user) {
      const storeUser = typeof window !== 'undefined' && JSON.parse(sessionStorage.getItem('user') || "{}");
      storeUser.id && setUser(storeUser);
    }
    user && savePlayerData(user?.id, user)
  }, [user])

useEffect(() => {
  console.log("visited is ", visited );
  visited && savePlayerData(user?.id, visited)
}, [visited, user?.id])


  const logout = () => {
    sessionStorage.removeItem('user');
    sessionStorage.removeItem('cities');
    sessionStorage.removeItem('visited');
    setUser(undefined)
    // TODO clear visited and polygons
  }

  return (
    <AuthContext.Provider value={{ user, setUser, cities, setCities, visited, setVisited, logout }}>
      { children }
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)