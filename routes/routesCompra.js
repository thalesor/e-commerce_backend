import { Router } from "express";
import {
	getCompras,
	registrarCompra,
} from "../controllers/comprasController.js";
import { valideteToken } from "../middleware/validateToken.js";

const compraRouter = Router();
//compraRouter.use(valideteToken);
compraRouter.post("/registrarCompra", valideteToken, registrarCompra);
compraRouter.get("/getcompras", valideteToken, getCompras);

export default compraRouter;
