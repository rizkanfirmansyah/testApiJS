import { FastifyReply, FastifyRequest } from "fastify";
import { createError } from "../../utils/errorUtils";
import ResponseJSON from "../../utils/response";
import { CategoryType } from "../../utils/types/book";
import { CustomError } from "../../utils/types/error";
import { deleteCategory, getCategories, insertCategory, updateCategory } from "./categoryModel";
import { server } from "../../server";

export async function getCategoryHandler(req: FastifyRequest, res: FastifyReply) {
  const id = req.user?.id ?? null;
  const params = req.params as { categoryId: string };
  const { categoryId } = params;
  const { redis } = server;

  try {
    const key = id + "user:category";
    // let data = await redis.get(key);
    let data = null;

    // if (data) {
    //   data = JSON.parse(data);
    //   return ResponseJSON({ data, message: "Category has already!", res });
    // }

    data = await getCategories({ id, categoryId });
    // redis.set(key, JSON.stringify(data), "EX", 3600);
    return ResponseJSON({ data, message: "Category has already!", res });
  } catch (err) {
    const error = err as CustomError;
    ResponseJSON({ data: null, message: "Error", error: error?.message, status: error?.statusCode ?? 500, res });
  }
}

export async function insertCategoryHandler(req: FastifyRequest, res: FastifyReply) {
  const request: any = req.body;
  try {
    if (!request?.name) throw createError("Name (title category) cannot be null", 422);
    const name = request?.name;
    const description = request?.description ?? null;
    const user_id = req.user?.id ?? null;

    const data = await insertCategory({ name, description, user_id });

    ResponseJSON({ data, message: "Category has been inserted!!", res });
  } catch (err) {
    const error = err as CustomError;
    ResponseJSON({ data: null, message: "Error", error: error?.message, status: error?.statusCode ?? 500, res });
  }
}

export async function updateCategoryHandler(req: FastifyRequest, res: FastifyReply) {
  const request: any = req.body;
  const id = req.user?.id ?? null;
  const params = req.params as { categoryId: string };
  const { categoryId } = params;
  try {
    if (!request?.name) throw createError("Name (title category) cannot be null", 422);
    const data: CategoryType = {
      name: "",
    };

    if (request?.name !== null) {
      data.name = request.name;
    }

    if (request?.description !== null) {
      data.description = request.description;
    }

    if (req.user?.id !== null) {
      data.user_id = req.user.id;
    }

    const category = await updateCategory(data, categoryId, id);

    if (category.length < 1) {
      throw createError("Category not found", 404);
    }

    ResponseJSON({ data: category, message: "Category has been Updated!!", res });
  } catch (err) {
    const error = err as CustomError;
    ResponseJSON({ data: null, message: "Error", error: error?.message, status: error?.statusCode ?? 500, res });
  }
}

export async function deleteCategoryHandler(req: FastifyRequest, res: FastifyReply) {
  const id = req.user?.id ?? null;
  const params = req.params as { categoryId: string };
  const { categoryId } = params;

  const data = await deleteCategory({ id, categoryId });

  if (data.length < 1) {
    throw createError("Category not found", 404);
  }

  try {
    ResponseJSON({ data, message: "Category has been deleted!", res });
  } catch (err) {
    const error = err as CustomError;
    ResponseJSON({ data: null, message: "Error", error: error?.message, status: error?.statusCode ?? 500, res });
  }
}
