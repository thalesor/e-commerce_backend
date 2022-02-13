import { Router } from "express";
import userRouter from "./routesUser.js";
import compraRouter from "./routesCompra.js";

const router = Router();

router.use(userRouter);
router.use(compraRouter);

export default router;
