import { v4 as uuid } from "uuid";
import bcrypt from "bcrypt";
import { dbService } from "../services/db-service.js";

export async function signUp(req, res) {
	const user = req.body;

	try {
		const passwordHash = bcrypt.hashSync(user.password, 10);
		const userCrtpt = { ...user, password: passwordHash };

		const result = await dbService.insert("users", userCrtpt);
		res.sendStatus(201);
	} catch {
		const response = `Não será possível cadastra usuário devido a um erro no servidor!`;
		res.status(500).send(response);
	}
}

export async function signIn(req, res) {
	const { email, password } = req.body;

	try {
		const [user] = await dbService.find("users", { email: email });

		if (user && bcrypt.compareSync(password, user.password)) {
			const token = uuid();
			console.log(token);

			const data = { userID: user._id, token };
			await dbService.insert("sessions", data);
			const sendData = {
				token: token,
				user: user.user
			}
			return res.json(sendData);
		}

		return res.status(401).send("Não há usuário com esse e-mail ou essa senha");
	} catch (error) {
		return res.status(401).send("Erro no servidor ao tentar se logar");
	}
}

export async function logout(req, res) {
	const user = res.locals.user;
	console.log(user);

	try {
		await dbService.deleteMany("sessions", { userID: user._id });
		res.sendStatus(202);
	} catch {
		console.log(error);
		res.sendStatus(400);
	}
}

export async function registrarCompra(req, res) {
	const user = res.locals.user;
	const compras = { ...req.body, userID: user._id };

	try {
		await dbService.insert("compras", compras);
		res.sendStatus(201);
	} catch (error) {
		console.log(error);
		return res.sendStatus(500);
	}
}
