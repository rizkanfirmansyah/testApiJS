import { date, integer, numeric, pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";

export const categories = pgTable("categories", {
  id: serial("id").primaryKey(),
  name: text("name"),
  description: text("description"),
  created_at: timestamp("created_at").notNull().defaultNow(),
  updated_at: timestamp("updated_at", { mode: "date", precision: 3 }).$onUpdate(() => new Date()),
});

export const genres = pgTable("genres", {
  id: serial("id").primaryKey(),
  name: text("name"),
  description: text("description"),
  category_id: integer("category_id").references(() => categories.id),
  created_at: timestamp("created_at").notNull().defaultNow(),
  updated_at: timestamp("updated_at", { mode: "date", precision: 3 }).$onUpdate(() => new Date()),
});

export const books = pgTable("books", {
  id: serial("id").primaryKey(),
  name: text("name"),
  description: text("description"),
  pages: integer("pages"),
  published_at: date("published_at"),
  author: text("author"),
  price: numeric("price", { precision: 10, scale: 2 }),
  genre_id: integer("genre_id").references(() => genres.id),
  created_at: timestamp("created_at").notNull().defaultNow(),
  updated_at: timestamp("updated_at", { mode: "date", precision: 3 }).$onUpdate(() => new Date()),
});
