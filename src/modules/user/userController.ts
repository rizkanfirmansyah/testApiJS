import { getUser } from "./userModel";

export async function getUserHandler() {
  const users = await getUser();

  return users;
}
