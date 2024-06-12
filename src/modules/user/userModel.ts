import { sql } from "drizzle-orm";
import setupDatabase from "../../../database";
import { user } from "../../../database/schema/user";
import { LoginType, RegisterType } from "../../utils/types/auth";

export async function getUser() {
  const DB = await setupDatabase();
  const result = await DB.select().from(user);

  return result;
}

export async function registerUser({ username, password, email }: RegisterType) {
  const DB = await setupDatabase();
  try {
    const data = await DB.insert(user)
      .values({
        name: username,
        password,
        role: "user",
        email,
      })
      .returning();
    return { message: "User registered successfully", status: 200, data };
  } catch (error) {
    return { message: "User registered failed", status: 500, data: null, error };
  }
}

export async function loginUser({ username }: LoginType) {
  const DB = await setupDatabase();
  try {
    const data = await DB.select()
      .from(user)
      .where(sql`${user.name} = ${username}`)
      .limit(1);

    return data;
  } catch (error) {
    return null;
  }
}
