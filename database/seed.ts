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

    const categoryInsert = await db
      .insert(categories)
      .values({
        name: "Dewasa",
        description: "Category Kedewasaan yang haqiqi",
      })
      .returning({ categoryId: categories.id });

    const categoryId = categoryInsert[0].categoryId;

    // Insert data ke dalam tabel genres
    const genreInsert = await db
      .insert(genres)
      .values({
        name: "Horor",
        description: "Pikasieenen Intinya mah Gess",
        category_id: categoryId ?? 1,
      })
      .returning({ id: genres.id });

    const genreId = genreInsert[0].id;

    await db.insert(books).values({
      name: "Naruto",
      description:
        "Naruto Shippuden adalah sebuah seri anime yang diadaptasi dari bagian II manga Naruto. Serial ini disutradarai oleh Hayato Date dan diproduksi oleh Studio Pierrot dan TV Tokyo. Pada bagian ini, pergerakan organisasi Akatsuki semakin terlihat.",
      pages: 200,
      published_at: new Date("2022-01-01"),
      author: "Masashi Kishimoto",
      price: 300.0,
      genre_id: genreId,
      user_id: 1, // Assuming you have a user with ID 1
      created_at: new Date("2023-07-05T03:37:51.000000Z"),
      updated_at: new Date("2023-07-05T03:37:51.000000Z"),
    });

    console.log("Seed start");
    await db.insert(user).values(data);
    console.log("Seed done");
  } catch (error) {
    console.error("Error seeding the database:", error);
  }
}

seeder();
