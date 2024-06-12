import { FastifyInstance, RouteShorthandOptions } from "fastify";
import { getUserHandler } from "../modules/user/userController";

async function userRoutes(server: FastifyInstance) {
  const opts: RouteShorthandOptions = {
    schema: {
      response: {
        200: {
          type: "object",
          properties: {
            id: { type: "integer" },
            name: { type: "string" },
            email: { type: "string" },
            password: { type: "string" },
            role: { type: "string", enum: ["admin", "customer"] },
            createdAt: { type: "string", format: "date-time" },
            updatedAt: { type: "string", format: "date-time" },
          },
        },
      },
    },
  };

  server.get("/", getUserHandler);
  server.get("/test", function (req, res) {
    return res.send("Hello World!");
  });
}

export default userRoutes;
