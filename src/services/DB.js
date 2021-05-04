
import user from "./user.db";
import settlements from "./settlement.db";

/*
const env = process.env.NODE_ENV === 'production' ?
  '-prod' :
  '-test';

export const DB_Collections = {
    settlements:"splitabill-settlements" + env,
    users:"splitabill-user" + env
}
*/

const DB = {
  user: user,
  settlements: settlements
};

export default DB;
