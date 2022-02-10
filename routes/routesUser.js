import { Router } from "express";
import { signUp } from "../controllers/userController.js";
import { valideSignUP } from "../middleware/validateSignUP.js";

const userRouter = Router();
userRouter.post("/signUP", valideSignUP, signUp);

export default userRouter;
