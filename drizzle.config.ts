import { defineConfig } from "drizzle-kit";
export default defineConfig({
  schema: "./database/schema/*",
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.DB_URL ?? "postgres://postgres:password@0.0.0.0:5432/fastify",
  },
  verbose: true,
  strict: true,
});
