import { dbService } from "../services/db-service.js";

export async function valideteToken(req, res, next) {
	const authorization = req.headers.authorization;
	const token = authorization?.replace("Bearer ", "");

	if (!token) {
		return res.sendStatus(401);
	}

	const session = await dbService.find("sessions", { token });
	if (!session) {
		return res.sendStatus(401);
	}

	const user = await dbService.find("users", { _id: session.userId });
	if (!user) {
		return res.sendStatus(401);
	}

	res.locals.user = user;
	next();
}
