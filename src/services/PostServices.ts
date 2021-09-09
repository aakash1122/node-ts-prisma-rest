import prisma from '../client/prismaClient';
import { creatPostDto } from 'interfaces/dto/PostDto';

class PostService {
  async create(PostToCreate: creatPostDto) {
    const resp = await prisma.post.create({
      data: PostToCreate,
    });
    return resp;
  }

  async findById(id: string) {
    const resp = await prisma.post.findUnique({
      where: {
        id: id,
      },
    });
    return resp;
  }
}

export default PostService;
