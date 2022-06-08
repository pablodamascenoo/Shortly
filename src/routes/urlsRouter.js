import Router from "express";
import { getUrl, postUrl } from "../controllers/urlsControllers.js";
import { verifyToken } from "../middlewares/authMiddlewares.js";
import { validateUrl, verifyUrlId } from "../middlewares/urlsMiddlewares.js";

const urlsRouter = Router();

urlsRouter.post("/urls/shorten", verifyToken, validateUrl, postUrl);
urlsRouter.get("/urls/:id", verifyUrlId, getUrl);

export default urlsRouter;
