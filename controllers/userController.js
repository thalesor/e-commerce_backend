import { v4 as uuid } from "uuid";
import bcrypt from "bcrypt";
import { dbService } from "../services/db-service.js";

export async function signUp(req, res) {
	const user = req.body;

	try {
		const passwordHash = bcrypt.hashSync(user.password, 10);
		const userCrtpt = { ...user, password: passwordHash };

		const result = await dbService.insert("users", { userCrtpt });
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

			return res.send(token);
		}

		return res.sendStatus(401);
	} catch (error) {
		console.log(error);
		return res.sendStatus(401);
	}
}

export async function getUser(req, res) {
	const user = res.locals.user;

	res.send(user).status(200);
}

export async function logout(req, res) {
	const user = res.locals.user;

	try {
		await db.dbService("sessions", { userID: user._id });
		res.sendStatus(202);
	} catch {
		console.log(error);
		res.sendStatus(400);
	}
}
