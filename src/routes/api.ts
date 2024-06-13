import { FastifyInstance } from "fastify";
import { deleteBookHandler, getBookHandler, insertBookHandler } from "../modules/book/bookController";
import { getUserHandler, loginHandler, registerHandler } from "../modules/user/userController";

async function userRoutes(server: FastifyInstance) {
  server.get("/", { preHandler: [server.authenticate] }, getUserHandler);
}

async function bookRoutes(server: FastifyInstance) {
  server.get("/", { preHandler: [server.authenticate] }, getBookHandler);
  server.get("/:bookId", { preHandler: [server.authenticate] }, getBookHandler);
  server.delete("/:bookId", { preHandler: [server.authenticate] }, deleteBookHandler);
  server.get("/all", getBookHandler);
  server.post("/all", insertBookHandler);
  server.post("/", { preHandler: [server.authenticate] }, insertBookHandler);
}

async function authRoutes(server: FastifyInstance) {
  server.post("/register", registerHandler);
  server.post("/login", loginHandler);
}

export { authRoutes, bookRoutes, userRoutes };
