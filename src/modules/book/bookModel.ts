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

export async function insertBook(data: BookType) {
  const DB = await setupDatabase();

  const result = await DB.insert(books).values(data).returning();

  return result;
}

export async function updateBook(data: BookType, bookId: number, id: number) {
  const DB = await setupDatabase();

  if (bookId < 1) {
    return null;
  }
  if (id < 1) {
    return null;
  }

  const result = await DB.update(books)
    .set(data)
    .where(sql`${books.user_id} = ${id} and ${books.id} = ${bookId}`)
    .returning();

  return result;
}

export async function deleteBook({ id = null, bookId = "0" }: any) {
  const DB = await setupDatabase();

  if (bookId == "0") {
    return null;
  }
  if (id < 1) {
    return null;
  }

  const result = await DB.delete(books)
    .where(sql`${books.user_id} = ${id} and ${books.id} = ${bookId}`)
    .returning();

  return result;
}
