import { signInSchema, signUpSchema } from "../schemas/authSchemas.js";
import pkg from "joi-translation-pt-br";
import db from "../db.js";
const { messages } = pkg;

export async function checkSignUp(req, res, next) {
    const signUp = req.body;

    const { error, value } = signUpSchema.validate(signUp, { messages });

    if (error) {
        return res.status(422).send(error.details[0].message);
    }

    try {
        const user = await db.query(
            `SELECT * FROM users WHERE name=$1 OR email=$2`,
            [value.name, value.email]
        );

        if (user.rowCount) {
            return res.status(409).send("email ou nome já cadastrados");
        }
    } catch (e) {
        return res.status(500).send(e);
    }

    res.locals.user = value;
    next();
}
