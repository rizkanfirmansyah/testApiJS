import ResponseJSON from "../../utils/response";
import { getBooks } from "./bookModel";

export async function getBookHandler() {
  const data = await getBooks();

  return ResponseJSON({ data });
}
