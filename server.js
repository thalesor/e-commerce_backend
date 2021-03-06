import express, { json } from "express";
import cors from "cors";
import { signIn, signUp } from "./controllers/userController.js";
import {
	postBook,
	getBook,
	getBooks,
	registrarLivros,
} from "./controllers/bookController.js";
import {
	getCategories,
	registrarCategorias,
} from "./controllers/categoryController.js";
import { validateBook } from "./services/joi-service.js";
import { validation } from "./validationMiddleware.js";
import router from "./routes/index.js";

const app = express();

app.use(json());
app.use(cors());
app.use(router);

app.post("/book", validation(validateBook), postBook);
app.get("/categories", getCategories);
app.get("/books", getBooks);
app.get("/book", getBook);
app.post("/signIn", signIn);
app.post("/signUp", signUp);
registrarCategorias();
registrarLivros();

app.listen(process.env.PORT || 5000, function(){
	console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
  });
