import joi from "joi";

const loginSchema = joi.object({
	email: joi.string().email().required(),
	password: joi.string().required(),
});

export function validateLogin(req, res, next) {
	const user = req.body;

	const validation = loginSchema.validate(user);

	if (validation.error) {
		const messageErro = validation.error.details.map((m) => m.message);
		console.log(messageErro);
		return res.sendStatus(422);
	}

	next();
}
