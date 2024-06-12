import { drizzle } from "drizzle-orm/postgres-js";
import { books } from "../../../database/schema/book";
import setupDatabase from "../../../database";
import { BookType } from "../../utils/types/book";

export async function getBooks() {
  const DB = await setupDatabase();
  const result = await DB.select().from(books);

  return result;
}

export async function insertBook({
  name,
  genre_id,
  id,
  published_at,
  author,
  description,
  pages,
  price,
  user_id,
}: BookType) {
  const DB = await setupDatabase();

  const data = {
    name,
    genre_id,
    published_at,
    author,
    description,
    pages,
    price,
    user_id,
  };

  const result = await DB.insert(books).values(data).returning();

  return result;
}
