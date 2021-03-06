import { Router } from "express";
import { signIn, signUp, logout } from "../controllers/userController.js";
import { valideSignUP } from "../middleware/validateSignUP.js";
import { validateLogin } from "../middleware/validateLogin.js";
import { valideteToken } from "../middleware/validateToken.js";

const userRouter = Router();
userRouter.post("/signUP", valideSignUP, signUp);
userRouter.post("/signIn", validateLogin, signIn);
userRouter.post("/logout", valideteToken, logout);

export default userRouter;
