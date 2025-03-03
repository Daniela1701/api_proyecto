import pkg from 'pg';
const { Pool } = pkg;
import {
    DB_HOST,
    DB_DATABASE,
    DB_USER,
    DB_PASSWORD,
    DB_PORT
} from './config.js';

export const pool = new Pool({
    host: DB_HOST,
    user: DB_USER,
    password: DB_PASSWORD,
    database: DB_DATABASE,
    port: DB_PORT, // Puerto predeterminado para PostgreSQL
    connectionTimeoutMillis: 10000 ,
    ssl: {
        rejectUnauthorized: false
    }
});

export async function testDBConnection() {
    try {
        const client = await pool.connect();
        const result = await client.query("SELECT * FROM clientes");
        console.log("Conexión exitosa a la base de datos.", result.rows);
        client.release();
    } catch (error) {
        console.error("Error al conectar a la base de datos:", error);
    }
}
// Llamamos a la función de prueba
testDBConnection();