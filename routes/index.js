import { Router } from "express";
import userRouter from "./routesUser.js";

const router = Router();

router.use(userRouter);

export default router;
