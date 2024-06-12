import { drizzle } from "drizzle-orm/postgres-js";
import { user } from "../../../database/schema/user";
import setupDatabase from "../../../database";

export async function getUser() {
  const SqlConfig = await setupDatabase(); // Await the setupDatabase function to get the actual Sql<{}> instance
  const db = drizzle(SqlConfig);
  const result = await db.select().from(user);

  SqlConfig.end();

  return result;
}
