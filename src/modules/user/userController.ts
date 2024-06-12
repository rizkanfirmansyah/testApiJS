import ResponseJSON from "../../utils/response";
import { getUser } from "./userModel";

export async function getUserHandler() {
  const data = await getUser();

  return ResponseJSON({ data });
}
