import { FastifyInstance, RouteShorthandOptions } from "fastify";
import { getUserHandler } from "../modules/user/userController";
import { getBookHandler } from "../modules/book/bookController";

async function userRoutes(server: FastifyInstance) {
  server.get("/", getUserHandler);
}

async function bookRoutes(server: FastifyInstance) {
  server.get("/", getBookHandler);
}

export { userRoutes, bookRoutes };
