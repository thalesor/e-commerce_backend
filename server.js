import express, { json } from "express";
import cors from "cors";
import { postBook } from "./controllers/bookController.js";
import {
	getCategories,
	registrarCategorias,
} from "./controllers/categoryController.js";
import { validateBook } from "./services/joi-service.js";
import { validation } from "./validationMiddleware.js";
import router from "./routes/index.js";

const app = express();

app.use(json());
app.options("*", cors());
app.use(cors());
app.use(router);

app.post("/book", validation(validateBook), postBook);
app.get("/categories", getCategories);

registrarCategorias();

app.post("/book", validation(validateBook), postBook);

app.listen("5000", (port) => {
	console.log(`Server running :^)`);
});
