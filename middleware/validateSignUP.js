import joi from "joi";

const signUpSchema = joi.object({
	user: joi.string().required(),
	email: joi.string().required(),
	password: joi.string().required(),
});

export function valideSignUP(req, res, next) {
	const login = req.body;

	const validation = signUpSchema.validate(login);
	if (validation.error) {
		const messageErro = validation.error.details.map((m) => m.message);
		console.log(messageErro);
		return res.sendStatus(422);
	}

	next();
}
