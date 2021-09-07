import { Prisma } from "@prisma/client";
import prisma from "../client/prismaClient";

const create = async (userToCreate: Prisma.UserCreateInput) => {
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
