import { client } from "..";
/*
 * Should insert into the users table
 * Should return the User object
 * {
 *   username: string,
 *   password: string,
 *   name: string
 * }
 */
export async function createUser(username: string, password: string, name: string) {
    let userCreateQuery = `INSERT INTO users (username,password,name)
    VALUES ($1,$2,$3)
    RETURNING username,password,name`;
    const userValues = [username, password, name];
    const res = await client.query(userCreateQuery, userValues);
    return res.rows[0];
}

/*
 * Should return the User object
 * {
 *   username: string,
 *   password: string,
 *   name: string
 * }
 */
export async function getUser(userId: number) {
    let findUserQuery = `SELECT id,username, password, name FROM users
    WHERE id=$1`;
    const res = await client.query(findUserQuery,[userId]);
    return res.rows[0];
}
