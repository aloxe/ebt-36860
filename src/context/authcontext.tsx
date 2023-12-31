'use client'
import { getPlayerRole, getRoles, savePlayerData } from '@/helpers/dbutils';
import { createContext, useContext, useEffect, useState } from 'react';
// @ts-ignore
import { GeoJsonTypes } from 'react-leaflet';

type Feature = GeoJsonTypes.Feature

export const AuthContext = createContext<any>(null)

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | undefined>(undefined);
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const [isTrans, setIsTrans] = useState<string>('');
  const [visited, setVisited] = useState<Visited | undefined>(undefined);
  const [polygons, setPolygons] = useState<Feature[] | undefined>(undefined);

  useEffect(() => {
    if (!user) {
      const storeUser = typeof window !== 'undefined' && JSON.parse(sessionStorage.getItem('user') || "{}");
      storeUser.id && setUser(storeUser);
    }
    user && savePlayerData(user?.id, user)
  }, [user])


useEffect(() => {
  // we stop saving visited
  // visited && savePlayerData(user?.id, visited)
}, [visited, user?.id])

  useEffect(() => {
    polygons && savePlayerData(user?.id, polygons)
  }, [polygons, user?.id])

  useEffect(() => {
    const getRolesAwaited = async (id: string) => {
      const role = await getRoles(id);
      setIsAdmin(role.admin)
      setIsTrans(role.trans)
    };
    if (user) {
      getRolesAwaited(user.id.toString())
    }
  }, [user])


  const logout = () => {
    sessionStorage.removeItem('user');
    setUser(undefined)
    setVisited(undefined)
    setPolygons([])
  }

  return (
    <AuthContext.Provider value={{ user, setUser, isAdmin, isTrans, visited, setVisited, polygons, setPolygons, logout }}>
      { children }
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)