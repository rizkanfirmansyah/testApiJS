import { FastifyInstance, RouteShorthandOptions } from "fastify";
import { getUserHandler, loginHandler, registerHandler } from "../modules/user/userController";
import { getBookHandler } from "../modules/book/bookController";

async function userRoutes(server: FastifyInstance) {
  server.get("/", { preHandler: [server.authenticate] }, getUserHandler);
}

async function bookRoutes(server: FastifyInstance) {
  server.get("/", getBookHandler);
}

async function authRoutes(server: FastifyInstance) {
  server.post("/register", registerHandler);
  server.post("/login", loginHandler);
}

export { userRoutes, bookRoutes, authRoutes };
