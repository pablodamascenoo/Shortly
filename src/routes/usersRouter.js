import { Router } from "express";
import { getRanking, getUser } from "../controllers/userControllers.js";
import { verifyToken } from "../middlewares/authMiddlewares.js";
import { findUserId } from "../middlewares/userMiddlewares.js";

const usersRouter = Router();

usersRouter.get("/users/:id", verifyToken, findUserId, getUser);
usersRouter.get("/ranking", getRanking);

export default usersRouter;
