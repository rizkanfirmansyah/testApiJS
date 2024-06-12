import { CustomError } from "./types/error";

export function createError(message: string, statusCode?: number): CustomError {
  const error = new Error(message) as CustomError;
  error.statusCode = statusCode;
  return error;
}
