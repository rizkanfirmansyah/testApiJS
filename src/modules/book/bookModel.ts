import { drizzle } from "drizzle-orm/postgres-js";
import { books } from "../../../database/schema/book";
import setupDatabase from "../../../database";

export async function getBooks() {
  const DB = await setupDatabase(); // Await the setupDatabase function to get the actual Sql<{}> instance
  const result = await DB.select().from(books);

  return result;
}
