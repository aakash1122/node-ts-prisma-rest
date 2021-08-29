import { Request, Response } from "express";
import PostService from "../services/PostServices";
import { Prisma } from "@prisma/client";

const createPost = async (req: Request, res: Response) => {
  try {
    const createdPost = await PostService.create(req.body);
    return res.status(200).json({ data: createdPost });
  } catch (e: any) {
    console.log(e);
    return res.status(500).json(e);
  }
};

const getAllPosts = async (req: Request, res: Response) => {
  return res.status(200).json("all posts");
};

const getPostById = async () => {};

export { getAllPosts, getPostById, createPost };
