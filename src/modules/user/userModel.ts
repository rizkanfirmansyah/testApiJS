import setupDatabase from "../../../database";
import { user } from "../../../database/schema/user";
import { LoginType } from "../../utils/types/auth";

export async function getUser() {
  const DB = await setupDatabase();
  const result = await DB.select().from(user);

  return result;
}

export async function registerUser({ username, password }: LoginType) {
  const DB = await setupDatabase();
  try {
    await DB.insert(user).values({
      username,
      password,
    });
    return { message: "User registered successfully", status: 200 };
  } catch (error) {
    return { message: "User registered failed", status: 500, error };
  }
}
