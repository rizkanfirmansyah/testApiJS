import dotenv from "dotenv";
import { drizzle } from "drizzle-orm/postgres-js";
import { migrate } from "drizzle-orm/postgres-js/migrator";
import postgres from "postgres";
dotenv.config();

export default async function setupDatabase() {
  const SqlMigrate = postgres(process.env.DB_URL ?? "postgres://postgres:password@0.0.0.0:5432/fastify", { max: 1 });
  const SqlConfigPromise = postgres(process.env.DB_URL ?? "postgres://postgres:password@0.0.0.0:5432/fastify");
  try {
    const SqlConfig = await SqlConfigPromise;
    // const DBMigrate = drizzle(SqlMigrate);
    // await migrate(DBMigrate, { migrationsFolder: "drizzle" });

    return SqlConfig;
  } catch (error) {
    await SqlConfigPromise.end();
    console.error("Error setting up database:", error);
    throw error;
  }
}
