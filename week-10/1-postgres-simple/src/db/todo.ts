import { client } from "..";
/*
 * Function should insert a new todo for this user
 * Should return a todo object
 * {
 *  title: string,
 *  description: string,
 *  done: boolean,
 *  id: number
 * }
 */
export async function createTodo(userId: number, title: string, description: string) {
    let createTodoQuery = `INSERT INTO todos (user_id,title,description) VALUES ($1,$2,$3) RETURNING *`;
    const todoDetails = [userId, title, description];
    const res = await client.query(createTodoQuery, todoDetails);
    return res.rows[0];
}
/*
 * mark done as true for this specific todo.
 * Should return a todo object
 * {
 *  title: string,
 *  description: string,
 *  done: boolean,
 *  id: number
 * }
 */
export async function updateTodo(todoId: number) {
    let updateTodoQuery = `UPDATE todos SET done = $1 
    WHERE id=${todoId} RETURNING title,description,done,id`;
    const res = await client.query(updateTodoQuery,[true]);
    return res.rows[0];
}

/*
 *  Get all the todos of a given user
 * Should return an array of todos
 * [{
 *  title: string,
 *  description: string,
 *  done: boolean,
 *  id: number
 * }]
 */
export async function getTodos(userId: number) {
    const getTodosQuery = `SELECT title,description,done,id,user_id FROM todos WHERE user_id=$1`;
    const res = await client.query(getTodosQuery,[userId]);
    return res.rows;
}