import prisma from "../client/prismaClient";

interface userDto {
  fullName: string;
  email: string;
  password: string;
}

const create = async (userToCreate: userDto) => {
  return await prisma.user.create({
    data: userToCreate,
  });
};

const users = async () => {
  const users = await prisma.user.findMany({});
  return users;
};

const UserById = async (id: string) => {
  return await prisma.user.findUnique({
    where: {
      id,
    },
  });
};

const UserByEmail = async (email: string) => {
  return await prisma.user.findUnique({
    where: {
      email,
    },
  });
};

export default {
  create,
  users,
  UserById,
  UserByEmail,
};
