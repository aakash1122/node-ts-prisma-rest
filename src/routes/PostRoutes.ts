import * as postController from "../controllers/PostController";
import { Router } from "express";

let router = Router();

router.get("/all", postController.getAllPosts);
router.get("/:id", postController.getPostById);

router.post("/create", postController.createPost);

export default router;
