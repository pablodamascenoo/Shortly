import { signInSchema, signUpSchema } from "../schemas/authSchemas.js";

export async function checkSignUp(req, res, next) {
    const signUp = req.body;

    const { error, value } = signUpSchema.validate(signUp);

    if (error) {
        return res.status(422).send(error.details[0].message);
    }

    res.locals.user = value;
    next();
}
