import { signInSchema, signUpSchema } from "../schemas/authSchemas.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
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

export async function checkSignIn(req, res, next) {
    const signIn = req.body;

    const { error, value } = signInSchema.validate(signIn, { messages });

    if (error) {
        return res.status(422).send(error.details[0].message);
    }

    try {
        const user = await db.query(`SELECT * FROM users WHERE email=$1`, [
            value.email,
        ]);

        if (
            !user.rowCount ||
            !bcrypt.compareSync(value.password, user.rows[0].password)
        ) {
            return res.status(401).send("usuário e/ou senha incorreto(s)");
        }

        res.locals.userId = user.rows[0].id;
        next();
    } catch (e) {
        console.log(e);
        return res.status(500).send(e);
    }
}

export async function verifyToken(req, res, next) {
    const { authorization } = req.headers;
    const token = authorization?.replace("Bearer ", "");

    if (!token) return res.status(401).send("você não está autenticado");

    const chaveSecreta = process.env.JWT_SECRET;

    try {
        const dados = jwt.verify(token, chaveSecreta);

        const user = await db.query(
            `SELECT u.* FROM sessions s JOIN users u ON s."userId" = u.id WHERE s.id=$1`,
            [dados.sessionId]
        );

        res.locals.user = user.rows[0];
        next();
    } catch (error) {
        console.log(error);
        return res.status(401).send("você não está autenticado");
    }
}
