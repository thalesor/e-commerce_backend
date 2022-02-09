import express, { json } from 'express';
import cors from 'cors';
import { postBook } from './controllers/bookController.js';
import { validateBook } from './services/joi-service.js';
import { validation } from './validationMiddleware.js';

const app = express();
dayjs.locale('pt-br');
app.use(json());
app.options('*', cors());
app.use(cors());

app.post('/book', validation(validateBook), postBook);

app.listen('5000', (port) => {
	console.log(`Server running :^)`);
});