import { FastifyReply, FastifyRequest } from "fastify";
import ResponseJSON from "../../utils/response";
import { getUser, loginUser, registerUser } from "./userModel";
import bcrypt from "bcrypt";
import { createError } from "../../utils/errorUtils";
import { CustomError } from "../../utils/types/error";
import { server } from "../../server";

export async function getUserHandler(req: FastifyRequest, res: FastifyReply) {
  const data = await getUser();

  return ResponseJSON({ data, res });
}

export async function registerHandler(req: FastifyRequest, res: FastifyReply) {
  const request: any = req.body;
  try {
    if (!request?.username) throw createError("Username cannot be null", 422);
    if (!request?.password) throw createError("password cannot be null", 422);
    if (!request?.email) throw createError("Email cannot be null", 422);

    const { username, password, email } = req.body as { username: string; password: string; email: string };

    const newPassword = await bcrypt.hash(password, 10);
    const { data, message, status } = await registerUser({ username, password: newPassword, email });

    ResponseJSON({ data, message, status, res });
  } catch (err) {
    const error = err as CustomError;
    ResponseJSON({ data: null, message: "Error", error: error?.message, status: error?.statusCode ?? 500, res });
  }
}

export async function loginHandler(req: FastifyRequest, res: FastifyReply) {
  const request: any = req.body;
  try {
    if (!request?.username && !request?.email) throw createError("Username cannot be null", 422);
    if (!request?.password) throw createError("password cannot be null", 422);

    const { password } = req.body as { username: string; password: string };
    const username = request.username ?? request.email;
    const data = await loginUser({ username });
    if (!data.length) {
      throw createError("Invalid username or password", 401);
    }

    const isPasswordValid = await bcrypt.compare(password, data[0].password);
    if (!isPasswordValid) {
      throw createError("Invalid username or password", 401);
    }

    const accessToken = server.jwt.sign({
      id: data[0].id,
      username: data[0].name,
      email: data[0].email,
    });
    const result = {
      user: { id: data[0].id, username: data[0].name, email: data[0].email, role: data[0].role },
      access_token: accessToken,
    };
    ResponseJSON({ data: result, message: "Success Login", res });
  } catch (err) {
    const error = err as CustomError;
    ResponseJSON({ data: null, message: "Error", error: error?.message, status: error?.statusCode ?? 500, res });
  }
}
