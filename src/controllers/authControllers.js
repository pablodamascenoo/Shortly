import db from "../db.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export async function signUp(req, res) {
    const { name, email, password } = res.locals.user;

    try {
        const cryptPassword = bcrypt.hashSync(
            password,
            Number(process.env.KEY)
        );

        await db.query(
            "INSERT INTO users (name, email, password) VALUES($1, $2, $3)",
            [name, email, cryptPassword]
        );

        res.sendStatus(201);
    } catch (error) {
        return res.status(500).send(error);
    }
}

export async function signIn(req, res) {
    const { userId } = res.locals;

    try {
        const sessionId = await db.query(
            `INSERT INTO sessions ("userId") VALUES($1) RETURNING id`,
            [userId]
        );

        const data = { sessionId: sessionId.rows[0].id };
        const config = { expiresIn: 60 * 60 * 24 };

        const token = jwt.sign(data, process.env.JWT_SECRET, config);
        return res.status(200).send(token);
    } catch (error) {
        console.log(error);
        return res.status(500).send(error);
    }
}
