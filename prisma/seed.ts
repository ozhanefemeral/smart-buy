import { PrismaClient } from "@prisma/client";
import { faker } from "@faker-js/faker";

const prisma = new PrismaClient();

const seedRealData = {
  car: {
    thumbnail:
      "https://smart-buy-bucket.s3.eu-central-1.amazonaws.com/seed-car-thumbnail.webp",
    images: [
      "https://smart-buy-bucket.s3.eu-central-1.amazonaws.com/seed-car.webp",
    ],
    price: 60000,
  },
  phone: {
    thumbnail:
      "https://smart-buy-bucket.s3.eu-central-1.amazonaws.com/seed-phone-thumbnail.webp",
    images: [
      "https://smart-buy-bucket.s3.eu-central-1.amazonaws.com/seed-phone.webp",
    ],
    price: 2500,
  },
  home: {
    thumbnail:
      "https://smart-buy-bucket.s3.eu-central-1.amazonaws.com/seed-home-thumbnail.webp",
    images: [
      "https://smart-buy-bucket.s3.eu-central-1.amazonaws.com/seed-home.webp",
    ],
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

  // Generate data for three posts
  const postsData = Array.from({ length: 3 }).map((_, i) => {
    const category = i % 3 === 0 ? "car" : i % 3 === 1 ? "phone" : "home";
    return {
      title: faker.lorem.sentence(),
      description: faker.lorem.paragraph(),
      price: seedRealData[category].price,
      images: seedRealData[category].images,
      thumbnail: seedRealData[category].thumbnail,
      ownerId: user.id,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
  });

  // Batch create three posts for the user
  await prisma.post.createMany({
    data: postsData,
  });

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
