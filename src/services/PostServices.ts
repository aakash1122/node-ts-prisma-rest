import prisma from "../client/prismaClient";
import { creatPostDto } from "interfaces/dto/PostDto";

const create = async (PostToCreate: creatPostDto) => {
  const resp = await prisma.post.create({
    data: PostToCreate,
  });
  return resp;
};

export default {
  create,
};
