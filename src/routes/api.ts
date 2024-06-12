import { FastifyInstance } from "fastify";
import { getBookHandler, insertBookHandler } from "../modules/book/bookController";
import { getUserHandler, loginHandler, registerHandler } from "../modules/user/userController";

async function userRoutes(server: FastifyInstance) {
  server.get("/", { preHandler: [server.authenticate] }, getUserHandler);
}

async function bookRoutes(server: FastifyInstance) {
  server.get("/", getBookHandler);
  server.post("/", insertBookHandler);
}

async function authRoutes(server: FastifyInstance) {
  server.post("/register", registerHandler);
  server.post("/login", loginHandler);
}

export { authRoutes, bookRoutes, userRoutes };
