import prisma from "../src/client/prismaClient";
import bcrypt from "bcrypt";
import faker from "faker";

const numOfData = Array(100).fill("_");

export async function seed() {
  // numOfData.forEach(async () => {
  // await prisma.user.create({
  //   data: {
  //     email: faker.internet.email().toLowerCase(),
  //     fullName: faker.name.findName(),
  //     password: await bcrypt.hash("aakash", 10),
  //     posts: {
  //       create: {
  //         title: faker.lorem.word(8),
  //         content: faker.lorem.word(500),
  //       },
  //     },
  //   },
  // });
  // });

  const ids = await prisma.post.findMany({
    select: {
      id: true,
    },
  });

  ids.map(async (data) => {
    await prisma.post.update({
      data: {
        title: faker.lorem.words(20),
        content: faker.lorem.words(300),
      },
      where: {
        id: data.id,
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
