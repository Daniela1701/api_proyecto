import { createPool } from "mysql2/promise";
import {
    DB_HOST,
    DB_DATABASE,
    DB_USER,
    DB_PASSWORD
} from './config.js';

export const pool = createPool({
    host: DB_HOST,
    user: DB_USER,
    password: '', 
    database: DB_DATABASE
});
