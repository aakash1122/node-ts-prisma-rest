import prisma from "../client/prismaClient";

const create = () => {};

const getUsers = async () => {
  const users = await prisma.user.findMany({});
  return users;
};

export default {
  create,
  getUsers,
};
