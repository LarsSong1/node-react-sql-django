import pg from 'pg'
import dotenv from dotenv


dotenv.config()

const db = new pg.Pool({
    host: process.env.DB_HOST, 
    database: process.env.DB_DATABASE,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
})


export default db;