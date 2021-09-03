import prisma from "../client/prismaClient";
import { creatPostDto } from "interfaces/dto/PostDto";

const create = async (PostToCreate: creatPostDto) => {
  const resp = await prisma.post.create({
    data: PostToCreate,
  });
  return resp;
};

const findById = async (id: string) => {
  const resp = await prisma.post.findUnique({
    where: {
      id: id,
    },
  });
  return resp;
};

export default {
  create,
  findById,
};
