import { Router } from "express";
import { signUp } from "../controllers/authControllers.js";
import { checkSignUp } from "../middlewares/authMiddlewares.js";

const authRouter = Router();

authRouter.post("/signup", checkSignUp, signUp);
authRouter.post("/signin");

export default authRouter;
