import dotenv from "dotenv";
import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
dotenv.config();

let DB: any = null;

export default async function setupDatabase() {
  if (DB) {
    return DB;
  }

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
