'use client'
import { useAuth } from "@/context/authcontext";
import { UnknownsView } from "./unknownsView";

export function Unknowns() {
  const { visited, user, setVisited} = useAuth();

  return (
    <UnknownsView 
      visited={visited}
      user={user}
      saveVisited={() => setVisited()}
    />
  )
}
