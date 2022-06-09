import Router from "express";
import {
    deleteUrl,
    getUrl,
    openUrl,
    postUrl,
} from "../controllers/urlsControllers.js";
import { verifyToken } from "../middlewares/authMiddlewares.js";
import {
    validateUrl,
    verifyShortUrl,
    verifyUrlId,
    verifyUrlOwner,
} from "../middlewares/urlsMiddlewares.js";

const urlsRouter = Router();

urlsRouter.post("/urls/shorten", verifyToken, validateUrl, postUrl);
urlsRouter.get("/urls/:id", verifyUrlId, getUrl);
urlsRouter.get("/urls/open/:shortUrl", verifyShortUrl, openUrl);
urlsRouter.delete(
    "/urls/:id",
    verifyToken,
    verifyUrlId,
    verifyUrlOwner,
    deleteUrl
);

export default urlsRouter;
