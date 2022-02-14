import { dbService } from "../services/db-service.js";
import dayjs from "dayjs";

export async function registrarCompra(req, res) {
	const user = res.locals.user;
	const time = dayjs().locale("pe-tb").format("DD/MM/YY HH:mm");
	const compras = { ...req.body, userID: user._id, data: time };

	try {
		await dbService.insert("compras", compras);
		res.sendStatus(201);
	} catch (error) {
		console.log(error);
		return res.sendStatus(500);
	}
}

export async function getCompras(req, res) {
	const user = res.locals.user;

	try {
		const data = await dbService.find("compras", { userID: user._id });
		res.send(data);
	} catch {
		console.log(error);
		return res.sendStatus(500);
	}
}
