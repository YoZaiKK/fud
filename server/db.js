import { createPool } from 'mysql2/promise';

// con this vamos a poder hacer consultas con un metodo query
export const pool = createPool({
  // sustituir pool con los datos de la base usada
  host: 'localhost',
  port: 3306,
  user: 'root',
  password: 'memopassword',
  database: 'taskdb'
})

// pool.query(`CREATE TABLE IF NOT EXISTS users`) 

