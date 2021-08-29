import prisma from "../client/prismaClient";
import { postDto } from "interfaces/dto/PostDto";

const create = async (PostToCreate: postDto) => {
  const resp = await prisma.post.create({
    data: PostToCreate,
  });
  return resp;
};

export default {
  create,
};
