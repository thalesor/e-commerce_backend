import bcrypt from "bcrypt";
import { v4 as uuid } from "uuid";
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
