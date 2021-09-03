import { BadRequest, NotFound } from "../Error/index";
import { NextFunction, Request, Response } from "express";
import Joi from "joi";
import prisma from "../client/prismaClient";
import PostService from "../services/PostServices";
import paginator from "../utils/paginator";
import { formatJoiError } from "./../utils/formatJoiError";

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
    const options = req.query;

    let numOfResults = await prisma.post.count({});
    let page: number = Number(options.page) || 1;
    let itemsPerPage: number = Number(options?.perPage || 25);

    console.log(page, itemsPerPage);

    console.log({
      skip: (page > 1 ? page : 0) * itemsPerPage,
      take: itemsPerPage,
    });

    const paginOption = paginator({
      currentPage: Number(options?.page) || 1,
      itemsPerPage: Number(options?.itemsPerPage || 25),
      numOfResults: numOfResults,
    });

    const allPosts = await prisma.post.findMany({
      skip: paginOption.offset,
      take: itemsPerPage,
    });

    return res.status(200).json({
      totalPages: paginOption.numOfPages,
      currentPage: page,
      hasMoreItems: paginOption.hasMore,
      totalRetured: allPosts.length,
      totalPosts: numOfResults,
      data: allPosts,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "something went wrong",
    });
  }
};

const getPostById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const post = await PostService.findById(req.query.id as string);

    if (!post) {
      throw new NotFound(`Post is not found by id ${req.query.id}`);
    }
  } catch (error) {
    return next(error);
  }
};

export { getAllPosts, getPostById, createPost };
