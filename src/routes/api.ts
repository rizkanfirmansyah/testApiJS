import { FastifyInstance } from "fastify";
import {
  deleteBookHandler,
  getBookHandler,
  insertBookHandler,
  updateBookHandler,
} from "../modules/book/bookController";
import { getUserHandler, loginHandler, registerHandler } from "../modules/user/userController";
import {
  deleteCategoryHandler,
  getCategoryHandler,
  insertCategoryHandler,
  updateCategoryHandler,
} from "../modules/category/categoryController";

async function userRoutes(server: FastifyInstance) {
  server.get("/", { preHandler: [server.authenticate] }, getUserHandler);
}

async function bookRoutes(server: FastifyInstance) {
  server.get("/", { preHandler: [server.authenticate] }, getBookHandler);
  server.get("/:bookId", { preHandler: [server.authenticate] }, getBookHandler);
  server.delete("/:bookId", { preHandler: [server.authenticate] }, deleteBookHandler);
  server.put("/:bookId", { preHandler: [server.authenticate] }, updateBookHandler);
  server.get("/all", getBookHandler);
  server.post("/all", insertBookHandler);
  server.post("/", { preHandler: [server.authenticate] }, insertBookHandler);
}

async function categoryRoutes(server: FastifyInstance) {
  server.get("/", { preHandler: [server.authenticate] }, getCategoryHandler);
  server.get("/:categoryId", { preHandler: [server.authenticate] }, getCategoryHandler);
  server.delete("/:categoryId", { preHandler: [server.authenticate] }, deleteCategoryHandler);
  server.put("/:categoryId", { preHandler: [server.authenticate] }, updateCategoryHandler);
  server.get("/all", getCategoryHandler);
  server.post("/all", insertCategoryHandler);
  server.post("/", { preHandler: [server.authenticate] }, insertCategoryHandler);
}

async function authRoutes(server: FastifyInstance) {
  server.post("/register", registerHandler);
  server.post("/login", loginHandler);
}

export { authRoutes, bookRoutes, userRoutes, categoryRoutes };
