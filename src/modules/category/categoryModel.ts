import { sql } from "drizzle-orm";
import setupDatabase from "../../../database";
import { categories } from "../../../database/schema/book";
import { CategoryType } from "../../utils/types/book";

export async function getCategories({ id = null, categoryId = "0" }: any) {
  const DB = await setupDatabase();

  if (categoryId != "0") {
    const result = await DB.select()
      .from(categories)
      .where(sql`${categories.id} = ${categoryId}`);
    return result ? result[0] : null;
  }
  if (id > 0) {
    const result = await DB.select()
      .from(categories)
      .where(sql`${categories.user_id} = ${id}`);
    return result;
  }
  if (id < 1) {
    const result = await DB.select()
      .from(categories)
      .where(sql`${categories.user_id} is null`);
    return result;
  }
}

export async function insertCategory(data: CategoryType) {
  const DB = await setupDatabase();

  const result = await DB.insert(categories).values(data).returning();

  return result;
}

export async function updateCategory(data: CategoryType, categoryId: string, id: number) {
  const DB = await setupDatabase();

  if (!categoryId || parseInt(categoryId) < 1) {
    return null;
  }
  if (id < 1) {
    return null;
  }

  const result = await DB.update(categories)
    .set(data)
    .where(sql`${categories.user_id} = ${id} and ${categories.id} = ${categoryId}`)
    .returning();

  return result[0];
}

export async function deleteCategory({ id = null, categoryId = "0" }: any) {
  const DB = await setupDatabase();

  if (categoryId == "0") {
    return null;
  }
  if (id < 1) {
    return null;
  }

  const result = await DB.delete(categories)
    .where(sql`${categories.user_id} = ${id} and ${categories.id} = ${categoryId}`)
    .returning();

  return result;
}
