import { defineConfig } from "drizzle-kit";
import { dbname, dbhost, dbpassword, dbport, dbuser } from "./database/config";
export default defineConfig({
  schema: "./database/schema/*",
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.DB_URL ?? `postgres://${dbuser}:${dbpassword}@${dbhost}:${dbport}/${dbname}`,
  },
  verbose: true,
  strict: true,
});
