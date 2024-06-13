import { FastifyReply, FastifyRequest } from "fastify";
import ResponseJSON from "../../utils/response";
import { deleteBook, getBooks, insertBook, updateBook } from "./bookModel";
import { CustomError } from "../../utils/types/error";
import { createError } from "../../utils/errorUtils";

export async function getBookHandler(req: FastifyRequest, res: FastifyReply) {
  const id = req.user?.id ?? null;
  const params = req.params as { bookId: string };
  const { bookId } = params;

  const data = await getBooks({ id, bookId });

  try {
    ResponseJSON({ data, message: "Book has already!", res });
  } catch (err) {
    const error = err as CustomError;
    ResponseJSON({ data: null, message: "Error", error: error?.message, status: error?.statusCode ?? 500, res });
  }
}

export async function insertBookHandler(req: FastifyRequest, res: FastifyReply) {
  const request: any = req.body;
  try {
    if (!request?.name) throw createError("Name (title book) cannot be null", 422);
    const name = request?.name;
    const description = request?.description ?? null;
    const published_at = request?.published_at ?? null;
    const pages = request?.pages ?? null;
    const author = request?.author ?? null;
    const price = request?.price ?? null;
    const genre_id = request?.genre_id ?? null;
    const user_id = req.user?.id ?? null;

    const data = await insertBook({ name, description, genre_id, published_at, author, pages, price, user_id });

    ResponseJSON({ data, message: "Book has been inserted!!", res });
  } catch (err) {
    const error = err as CustomError;
    ResponseJSON({ data: null, message: "Error", error: error?.message, status: error?.statusCode ?? 500, res });
  }
}

export async function updateBookHandler(req: FastifyRequest, res: FastifyReply) {
  const request: any = req.body;
  const id = req.user?.id ?? null;
  const params = req.params as { bookId: string };
  const { bookId } = params;
  try {
    if (!request?.name) throw createError("Name (title book) cannot be null", 422);
    const name = request?.name;
    const description = request?.description ?? null;
    const published_at = request?.published_at ?? null;
    const pages = request?.pages ?? null;
    const author = request?.author ?? null;
    const price = request?.price ?? null;
    const genre_id = request?.genre_id ?? null;
    const user_id = req.user?.id ?? null;

    const data = await updateBook(
      { name, description, genre_id, published_at, author, pages, price, user_id },
      bookId,
      id
    );

    if (data.length < 1) {
      throw createError("Book not found", 404);
    }

    ResponseJSON({ data, message: "Book has been Updated!!", res });
  } catch (err) {
    const error = err as CustomError;
    ResponseJSON({ data: null, message: "Error", error: error?.message, status: error?.statusCode ?? 500, res });
  }
}

export async function deleteBookHandler(req: FastifyRequest, res: FastifyReply) {
  const id = req.user?.id ?? null;
  const params = req.params as { bookId: string };
  const { bookId } = params;

  const data = await deleteBook({ id, bookId });

  if (data.length < 1) {
    throw createError("Book not found", 404);
  }

  try {
    ResponseJSON({ data, message: "Book has been deleted!", res });
  } catch (err) {
    const error = err as CustomError;
    ResponseJSON({ data: null, message: "Error", error: error?.message, status: error?.statusCode ?? 500, res });
  }
}
