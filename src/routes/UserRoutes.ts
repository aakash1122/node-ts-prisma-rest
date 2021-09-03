import UserController from "../controllers/UserController";
import { Request, Response, Router } from "express";

let userRouter = Router();

userRouter.get("/all", UserController.getAllUser);

export default userRouter;
