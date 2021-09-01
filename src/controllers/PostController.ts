import { formatJoiError } from "./../utils/formatJoiError";
import { Request, Response } from "express";
import PostService from "../services/PostServices";
import prisma from "../client/prismaClient";
import Joi from "joi";

const createPostSchema = Joi.object({
  title: Joi.string().min(20).required(),
  content: Joi.string().min(200).required(),
  authorId: Joi.string().required(),
  published: Joi.boolean(),
});

const options = {
  abortEarly: true, // include all errors
  allowUnknown: true, // ignore unknown props
  stripUnknown: true, // remove unknown props
};

const createPost = async (req: Request, res: Response) => {
  try {
    const { error, value } = createPostSchema.validate(req.body, options);
    console.log(error, value);

    if (error) {
      return res.status(400).json({
        error: formatJoiError(error),
      });
    }

    const createdPost = await PostService.create(value);
    return res.status(200).json({ data: createdPost });
  } catch (e: any) {
    console.log(e);
    return res.status(500).json(e);
  }
};

const getAllPosts = async (req: Request, res: Response) => {
  try {
    const allPosts = await prisma.post.findMany({});
    return res.status(200).json(allPosts);
  } catch (error) {
    console.log(error);
    throw new Error("failed to fetch data");
  }
};

const getPostById = async () => {};

export { getAllPosts, getPostById, createPost };
