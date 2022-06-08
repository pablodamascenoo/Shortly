import pkg from "joi-translation-pt-br";
import urlsSchema from "../schemas/urlsSchema.js";
import { failure, warning } from "../misc/chalkAlerts.js";
const { messages } = pkg;
import db from "../db.js";

export async function validateUrl(req, res, next) {
    const { url } = req.body;

    const { error } = urlsSchema.validate(url, { messages });

    if (error) {
        warning(error);
        return res.status(422).send(error);
    }

    res.locals.url = url;
    next();
}

export async function verifyUrlId(req, res, next) {
    const { id } = req.params;

    try {
        const url = await db.query(`SELECT * FROM urls WHERE id=$1`, [id]);

        if (!url.rowCount) return res.status(404).send("url não encontrada");

        res.locals.url = url.rows[0];
        next();
    } catch (error) {
        failure(error);
        return res.status(500).send(error);
    }
}
