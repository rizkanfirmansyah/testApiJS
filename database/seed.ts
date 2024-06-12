import { faker } from "@faker-js/faker";
import bcrypt from "bcrypt";
import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import { user } from "./schema/user";
import { books, categories, genres } from "./schema/book";
import { dbname, dbhost, dbpassword, dbport, dbuser } from "./config";

async function seeder() {
  const Sql = postgres(process.env.DB_URL ?? `postgres://${dbuser}:${dbpassword}@${dbhost}:${dbport}/${dbname}`, {
    max: 1,
  });
  const db = drizzle(Sql);

  try {
    const data: (typeof user.$inferInsert)[] = [];
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash("12345", saltRounds);

    console.log("Seed start");
    for (let i = 0; i < 5; i++) {
      const name = faker.internet.userName() || "example";
      const email = faker.internet.email() || "example@gmail.com";

      if (i == 0) {
        data.push({
          name: "admin",
          email: "admin@gmail.com",
          password: hashedPassword,
          role: "admin",
        });
      } else {
        data.push({
          name,
          email,
          password: hashedPassword,
          role: "user",
        });
      }
    }
    await db.insert(user).values(data);

    const categoryInsert = await db
      .insert(categories)
      .values({
        name: "Dewasa",
        description: "Category Kedewasaan yang haqiqi",
      })
      .returning({ categoryId: categories.id });

    const categoryId = categoryInsert[0].categoryId;

    const genreInsert = await db
      .insert(genres)
      .values({
        name: "Horor",
        description: "Pikasieenen Intinya mah Gess",
        category_id: categoryId ?? 1,
      })
      .returning({ id: genres.id });

    const genreId = genreInsert[0].id;

    // const book = await db.insert(books).values({
    //   name: "Naruto",
    //   author: "Mashasi Kishimoto",
    //   genre_id: genreId,
    //   description: "Komik ninja terlaris tahun 2000an dan anime dengan pendukung termasuk banyak",
    //   price: 10000,
    //   pages: 125,
    //   user_id: 1,
    // });

    console.log("Seed done");
    process.exit();
  } catch (error) {
    console.error("Error seeding the database:", error);
  }
}

seeder();
