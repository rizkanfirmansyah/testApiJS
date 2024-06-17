import { FastifyReply, FastifyRequest } from "fastify";
import ResponseJSON from "../../utils/response";
import { CustomError } from "../../utils/types/error";
import { createError } from "../../utils/errorUtils";
import { BookType, GenreType } from "../../utils/types/book";
import { deleteGenre, getGenres, insertGenre, updateGenre } from "./genreModel";

export async function getGenreHandler(req: FastifyRequest, res: FastifyReply) {
  const id = req.user?.id ?? null;
  const params = req.params as { genreId: string };
  const { genreId } = params;

  const data = await getGenres({ id, genreId });

  try {
    ResponseJSON({ data, message: "Genre has already!", res });
  } catch (err) {
    const error = err as CustomError;
    ResponseJSON({ data: null, message: "Error", error: error?.message, status: error?.statusCode ?? 500, res });
  }
}

export async function insertGenreHandler(req: FastifyRequest, res: FastifyReply) {
  const request: any = req.body;
  try {
    if (!request?.name) throw createError("Name (title Genre) cannot be null", 422);
    const name = request?.name;
    const description = request?.description ?? null;
    const user_id = req.user?.id ?? null;

    const data = await insertGenre({ name, description, user_id });

    ResponseJSON({ data, message: "Genre has been inserted!!", res });
  } catch (err) {
    const error = err as CustomError;
    ResponseJSON({ data: null, message: "Error", error: error?.message, status: error?.statusCode ?? 500, res });
  }
}

export async function updateGenreHandler(req: FastifyRequest, res: FastifyReply) {
  const request: any = req.body;
  const id = req.user?.id ?? null;
  const params = req.params as { genreId: string };
  const { genreId } = params;
  try {
    if (!request?.name) throw createError("Name (title Genre) cannot be null", 422);
    const data: GenreType = {
      name: "",
    };

    if (request?.name !== null) {
      data.name = request.name;
    }

    if (request?.description !== null) {
      data.description = request.description;
    }

    if (request?.category_id !== null) {
      data.category_id = request.category_id;
    }

    if (req.user?.id !== null) {
      data.user_id = req.user.id;
    }

    const Genre = await updateGenre(data, genreId, id);

    if (Genre.length < 1) {
      throw createError("Genre not found", 404);
    }

    ResponseJSON({ data: Genre, message: "Genre has been Updated!!", res });
  } catch (err) {
    const error = err as CustomError;
    ResponseJSON({ data: null, message: "Error", error: error?.message, status: error?.statusCode ?? 500, res });
  }
}

export async function deleteGenreHandler(req: FastifyRequest, res: FastifyReply) {
  const id = req.user?.id ?? null;
  const params = req.params as { genreId: string };
  const { genreId } = params;

  const data = await deleteGenre({ id, genreId });

  if (data.length < 1) {
    throw createError("Genre not found", 404);
  }

  try {
    ResponseJSON({ data, message: "Genre has been deleted!", res });
  } catch (err) {
    const error = err as CustomError;
    ResponseJSON({ data: null, message: "Error", error: error?.message, status: error?.statusCode ?? 500, res });
  }
}
