import dotenv from "dotenv";
import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import { dbname, dbhost, dbpassword, dbport, dbuser } from "./config";
dotenv.config();

let DB: any = null;

export default async function setupDatabase() {
  if (DB) {
    return DB;
  }

  const Sql = postgres(process.env.DB_URL ?? `postgres://${dbuser}:${dbpassword}@${dbhost}:${dbport}/${dbname}`, {
    max: 1,
  });
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
