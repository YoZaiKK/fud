import { createPool } from 'mysql2/promise';

// con this vamos a poder hacer consultas con un metodo llamado query
export const pool = createPool({
  host: 'localhost',
  port: 3306,
  user: 'root',
  password: 'memopassword',
  database: 'taskdb'
})

// pool.query(`CREATE TABLE IF NOT EXISTS users`)




