import { addPost } from "@/lib/aws";
import { faker } from "@faker-js/faker";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const seedRealData = {
  car: {
    title: "Ford F-150",
    description: `
    2022 Ford F-150 Lariat 4x4 SuperCrew Cab Styleside 5.5 ft. box 145 in. WB.
    3.5L V6 Turbocharger Engine, 10-speed automatic transmission.

    Photo by Caleb White on Unsplash
    https://unsplash.com/photos/blue-ford-pickup-truck-XGJBSkoqX_I
    `,
    thumbnail: "seed-car-thumbnail.webp",
    images: ["seed-car.webp"],
    price: 60000,
  },
  phone: {
    title: "iPhone 14 256GB",
    description: `
      Brand new iPhone 14, 256GB, barely used. Comes with original box and charger.
      I still have the receipt and warranty. Selling because my wife doesn't like the color.

      Photo by Rahul Mishra on Unsplash
      https://unsplash.com/photos/a-person-holding-a-cell-phone-in-their-hand-NdHIw9PkVB8
    `,
    thumbnail: "seed-phone-thumbnail.webp",
    images: ["seed-phone.webp"],
    price: 2500,
  },
  home: {
    title: "3 Bedroom House - Miami",
    description: `
    Beautiful 3 bedroom house in Miami, Florida. 2 bathrooms, 1 garage, 2 floors.
    The house is located in a quiet neighborhood, close to the beach.

    Photo by Kara Eads on Unsplash
    https://unsplash.com/photos/living-room-L7EwHkq1B2s
    `,
    thumbnail: "seed-home-thumbnail.webp",
    images: ["seed-home.webp"],
    price: 250000,
  },
};

async function seed() {
  // clear the database
  await prisma.post.deleteMany();
  await prisma.user.deleteMany();

  console.log("Database cleared 🧹");

  // Create a user
  const user = await prisma.user.create({
    data: {
      name: faker.person.fullName(),
      email: faker.internet.email(),
      phone: faker.phone.number(),
      emailVerified: new Date(),
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  });

  const posts = await Promise.all(
    Object.values(seedRealData).map(async (post) => {
      return prisma.post.create({
        data: {
          title: post.title,
          description: post.description,
          thumbnail: post.thumbnail,
          images: post.images,
          price: post.price,
          ownerId: user.id,
          isPublished: true,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      });
    }),
  );

  await Promise.all(
    posts.map(async (post) => {
      await addPost(post.id);
    }),
  );

  console.log("Seed completed 🌱");
}

seed()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
