import { Router } from "express";
import { signIn, signUp } from "../controllers/authControllers.js";
import { checkSignIn, checkSignUp } from "../middlewares/authMiddlewares.js";

const authRouter = Router();

authRouter.post("/signup", checkSignUp, signUp);
authRouter.post("/signin", checkSignIn, signIn);

export default authRouter;
