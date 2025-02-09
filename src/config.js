import dotenv from "dotenv";
dotenv.config();

export const PORT = process.env.PORT || 5432;
export const DB_HOST = process.env.DB_HOST || "dpg-cukbjt2j1k6c73d641q0-a.oregon-postgres.render.com";
export const DB_USER = process.env.DB_USER || "db_yoga_user";
export const DB_PASSWORD = process.env.DB_PASSWORD || "qtK44bLby28kDq62xAPQWpVtPMj8kvVk";
export const DB_DATABASE = process.env.DB_DATABASE || "db_yoga";
export const SECRET_KEY = process.env.SECRET_KEY || "mi_clave_secreta";
