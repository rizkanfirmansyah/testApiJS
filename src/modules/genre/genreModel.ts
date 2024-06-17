import { sql } from "drizzle-orm";
import setupDatabase from "../../../database";
import { genres } from "../../../database/schema/book";
import { GenreType } from "../../utils/types/book";

export async function getGenres({ id = null, genreId = "0" }: any) {
  const DB = await setupDatabase();

  if (genreId != "0") {
    const result = await DB.select()
      .from(genres)
      .where(sql`${genres.id} = ${genreId}`);
    return result ? result[0] : null;
  }
  if (id > 0) {
    const result = await DB.select()
      .from(genres)
      .where(sql`${genres.user_id} = ${id}`);
    return result;
  }
  if (id < 1) {
    const result = await DB.select()
      .from(genres)
      .where(sql`${genres.user_id} is null`);
    return result;
  }
}

export async function insertGenre(data: GenreType) {
  const DB = await setupDatabase();

  const result = await DB.insert(genres).values(data).returning();

  return result;
}

export async function updateGenre(data: GenreType, genreId: string, id: number) {
  const DB = await setupDatabase();

  if (!genreId || parseInt(genreId) < 1) {
    return null;
  }
  if (id < 1) {
    return null;
  }

  const result = await DB.update(genres)
    .set(data)
    .where(sql`${genres.user_id} = ${id} and ${genres.id} = ${genreId}`)
    .returning();

  return result[0];
}

export async function deleteGenre({ id = null, genreId = "0" }: any) {
  const DB = await setupDatabase();

  if (genreId == "0") {
    return null;
  }
  if (id < 1) {
    return null;
  }

  const result = await DB.delete(genres)
    .where(sql`${genres.user_id} = ${id} and ${genres.id} = ${genreId}`)
    .returning();

  return result;
}
