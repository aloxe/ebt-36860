import { getCountsServer, getUsers } from "./dbutils";
import { compareAlt, comparePop, compareScore, compareSurf } from "./strings";

const getOldPlayers = () => {
  const oldJsonPlayers = require("@/data/players/leaderboard_old.json");
  const oldPlayers: User[] = oldJsonPlayers.map((el: any)  => ({
    id: el.user,
    score: el.nombre,
    username: el.username,
    my_flag: el.userflag,
    pop: el.population ?? 0,
    surf: el.surface ?? 0,
    alt: el.altitude ?? 0,
    date: el.date * 1000 || el.filedate * 1000
  }))
  return oldPlayers;
}

export const getNewPlayers = async () => {
  const barePlayers: User[] = await getUsers()
  let newPlayers = await Promise.all(barePlayers.map(async (p): Promise<User> => {
    let counts = await getCountsServer(p.id, "prefectures,date,count")
    p.count = counts?.count ? JSON.parse(counts?.count) : undefined;
    p.score = counts ? p.count.communes : 0
    p.pop = counts ? p.count.pop : 0
    p.surf = counts ? p.count.surf : 0
    p.alt = counts ? p.count.alt : 0
    p.date = counts ? new Date(counts.date) : p.date
    return p;
  }));
  return newPlayers;
}

const mergePlayers = (newPlayers: User[], oldPlayers: User[]) => {
  const barePlayerIds = newPlayers.map(el => el.id)
  oldPlayers = oldPlayers.filter((u: any) => !barePlayerIds.includes(u.id))
  let players = [...newPlayers, ...oldPlayers]
  return players
}

export const getAllPlayers = async () => {
  const newPlayers = await getNewPlayers();
  const oldPlayers = getOldPlayers();
  return mergePlayers(newPlayers, oldPlayers);
}

export const getAllPlayersSorted = async (type: string) => {
  const allPlayers = await getAllPlayers();
  if (type === "alt") return allPlayers.sort( compareAlt );
  if (type === "pop") return allPlayers.sort( comparePop );
  if (type === "surf") return allPlayers.sort( compareSurf );
  return allPlayers.sort( compareScore );
}
