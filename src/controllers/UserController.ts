import { Request, Response } from "express";
import UserService from "../services/UserService";

const createUser = async () => {};

const getAllUser = async (req: Request, res: Response) => {
  try {
    const users = await UserService.getUsers();
    return res.status(200).json({
      status: "success",
      data: users,
    });
  } catch (error) {
    return res.status(500).json({
      message: "something went wrong while fetching the data",
    });
  }
};

export default {
  createUser,
  getAllUser,
};
