import { sql } from "drizzle-orm";
import setupDatabase from "../../../database";
import { books } from "../../../database/schema/book";
import { BookType } from "../../utils/types/book";

export async function getBooks({ id = null, bookId = "0" }: any) {
  const DB = await setupDatabase();

  if (bookId != "0") {
    const result = await DB.select()
      .from(books)
      .where(sql`${books.id} = ${bookId}`);
    return result ? result[0] : null;
  }
  if (id > 0) {
    const result = await DB.select()
      .from(books)
      .where(sql`${books.user_id} = ${id}`);
    return result;
  }
  if (id < 1) {
    const result = await DB.select()
      .from(books)
      .where(sql`${books.user_id} is null`);
    return result;
  }
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
