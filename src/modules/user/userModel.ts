import { drizzle } from "drizzle-orm/postgres-js";
import { user } from "../../../database/schema/user";
import setupDatabase from "../../../database";

export async function getUser() {
  const DB = await setupDatabase(); // Await the setupDatabase function to get the actual Sql<{}> instance
  const result = await DB.select().from(user);

  return result;
}
