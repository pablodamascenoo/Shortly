import Router from "express";
import { getUrl, openUrl, postUrl } from "../controllers/urlsControllers.js";
import { verifyToken } from "../middlewares/authMiddlewares.js";
import {
    validateUrl,
    verifyShortUrl,
    verifyUrlId,
} from "../middlewares/urlsMiddlewares.js";

const urlsRouter = Router();

urlsRouter.post("/urls/shorten", verifyToken, validateUrl, postUrl);
urlsRouter.get("/urls/:id", verifyUrlId, getUrl);
urlsRouter.get("/urls/open/:shortUrl", verifyShortUrl, openUrl);

export default urlsRouter;
