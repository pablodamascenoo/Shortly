import Router from "express";
import { postUrl } from "../controllers/urlsControllers.js";
import { verifyToken } from "../middlewares/authMiddlewares.js";
import { validateUrl } from "../middlewares/urlsMiddlewares.js";

const urlsRouter = Router();

urlsRouter.post("/urls/shorten", verifyToken, validateUrl, postUrl);

export default urlsRouter;
