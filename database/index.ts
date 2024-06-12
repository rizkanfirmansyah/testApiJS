import dotenv from "dotenv";
import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
dotenv.config();

let DB: any = null;

export default async function setupDatabase() {
  if (DB) {
    return DB;
  }

  const host = process.env.DB_HOST ?? "0.0.0.0";
  const user = process.env.DB_USER ?? "postgres";
  const password = process.env.DB_PASSWORD ?? "password";
  const dbname = process.env.DB_NAME ?? "fastify";
  const port = process.env.DB_PORT ?? 5432;

  const Sql = postgres(process.env.DB_URL ?? `postgres://${user}:${password}@${host}:${port}/${dbname}`, { max: 1 });
  try {
    DB = drizzle(Sql);
    // Optionally run migrations
    // await migrate(DB, { migrationsFolder: "drizzle" });
    return DB;
  } catch (error) {
    if (Sql) {
      await Sql.end();
    }
    console.error("Error setting up database:", error);
    throw error;
  }
}
