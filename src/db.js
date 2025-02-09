import pkg from 'pg';
const { Pool } = pkg;
import {
    DB_HOST,
    DB_DATABASE,
    DB_USER,
    DB_PASSWORD,
    PORT
} from './config.js';

export const pool = new Pool({
    host: DB_HOST,
    user: DB_USER,
    password: DB_PASSWORD,
    database: DB_DATABASE,
    port: PORT, // Puerto predeterminado para PostgreSQL
    connectionTimeoutMillis: 10000 ,
    ssl: {
        rejectUnauthorized: false
    }
});

async function testDBConnection() {
    try {
        const client = await pool.connect();
        const [rows] = await client.query("SELECT * FROM clientes");
        console.log("Conexión exitosa a la base de datos.",rows);
        client.release();
    } catch (error) {
        console.error("Error al conectar a la base de datos:", error);
    }
}

// Llamamos a la función de prueba
testDBConnection();