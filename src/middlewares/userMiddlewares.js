import db from "../db.js";
import { failure } from "../misc/chalkAlerts.js";

export async function findUserId(req, res, next) {
    const { id } = req.params;

    if (isNaN(parseInt(id)))
        return res.status(422).send("o id deve ser numérico");

    try {
        const user = await db.query("SELECT * FROM users WHERE id=$1", [id]);

        if (!user.rowCount)
            return res.status(404).send("usuário não encontrado");

        res.locals.user = user.rows[0];
        next();
    } catch (error) {
        failure(error);
        return res.status(500).send("erro no servidor");
    }
}
