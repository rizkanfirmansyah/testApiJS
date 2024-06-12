import dotenv from "dotenv";
import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
dotenv.config();

let DB: any = null;

export default async function setupDatabase() {
  if (DB) {
    return DB;
  }

  const host = process.env.DB_HOST ?? "";
  const user = process.env.DB_USER ?? "";
  const password = process.env.DB_PASSWORD ?? "";
  const db = process.env.DB_NAME ?? "";
  const port = process.env.DB_PORT ?? 5432;

  const Sql = postgres(process.env.DB_URL ?? "postgres://postgres:password@0.0.0.0:5432/fastify", { max: 1 });
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
