import { getUsers } from "./dbutils";
import { getPublicUser } from "./ebtutils";
import { compareScore, getUserFlag, isJson } from "./strings";

const getOldPlayers = () => {
  const oldJsonPlayers = require("@/data/players/leaderboard_old.json");
  const oldPlayers: DbUser[] = oldJsonPlayers.map((el: any)  => ({
    user_id: el.user,
    score: el.nombre,
    username: el.username,
    flag: el.userflag,
    date: el.date * 1000 || el.filedate * 1000
  }))
  return oldPlayers;
}

export const getNewPlayers = async () => {
  const { users: barePlayers }: { users: DbUser[] } = await getUsers()
  // const barePlayers: DbUser[] = await getUsers()
  let newPlayers = await Promise.all(barePlayers.map(async (p): Promise<DbUser> => {
    p.score = JSON.parse(p.content || "{}").communes?.length;
    // TODO keep only parsing when all users are recorded again
    p.username = isJson(p.user) ? JSON.parse(p.user).username : p.user;
    let pu = await getPublicUser(p.user_id)
    p.country = isJson(p.user) ? JSON.parse(p.user).my_country : pu.my_country
    p.flag = getUserFlag(p.country)
    if (p.content) { 
      p.visited = JSON.parse(p.content) 
    } else {
      p.visited = undefined
    }
    return p;
  }));
  return newPlayers;
}

const mergePlayers = (newPlayers: DbUser[], oldPlayers: DbUser[]) => {
  const barePlayerIds = newPlayers.map(el => el.user_id)
  oldPlayers = oldPlayers.filter((u: any) => !barePlayerIds.includes(u.user_id))
  let players = [...newPlayers, ...oldPlayers]
  players.sort( compareScore );
  return players
}

export const getAllPlayers = async () => {
  const newPlayers = await getNewPlayers();
  const oldPlayers = getOldPlayers();
  return mergePlayers(newPlayers, oldPlayers);
  // return players
}