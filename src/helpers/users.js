import { getUserFlag } from "@/helpers/strings";

export const completeUser = (user, login) => {
    user.email = login;
    user.my_flag = getUserFlag(user.my_country);
    user.date = Date.now();
    return user
}
