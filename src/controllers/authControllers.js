import db from "../db.js";
import bcrypt from "bcrypt";

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
