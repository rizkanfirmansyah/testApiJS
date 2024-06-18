import dotenv from "dotenv";
dotenv.config();

export const dbhost = process.env.DB_HOST ?? "0.0.0.0";
export const dbuser = process.env.DB_USER ?? "postgres";
export const dbpassword = process.env.DB_PASSWORD ?? "password";
export const dbname = process.env.DB_NAME ?? "fastify";
export const dbport = process.env.DB_PORT ?? 5432;
