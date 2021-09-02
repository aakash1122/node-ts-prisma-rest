import prisma from "../src/client/prismaClient";
import bcrypt from "bcrypt";
import faker from "faker";

const numOfData = Array(100).fill("_");

export async function seed() {
  numOfData.forEach(async () => {
    await prisma.user.create({
      data: {
        email: faker.internet.email().toLowerCase(),
        fullName: faker.name.findName(),
        password: await bcrypt.hash("aakash", 10),
        posts: {
          create: {
            title: faker.lorem.words(20),
            content: faker.lorem.words(300),
          },
        },
      },
    });
  });
}

seed()
  .catch((err) => {
    console.error(err);
    process.exit(1);
  })
  .finally(async () => prisma.$disconnect());
