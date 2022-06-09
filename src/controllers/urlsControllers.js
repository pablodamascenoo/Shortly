import db from "../db.js";
import { nanoid } from "nanoid";
import { failure } from "../misc/chalkAlerts.js";

export async function postUrl(req, res) {
    const { user } = res.locals;
    const { url } = res.locals;

    try {
        await db.query(
            `INSERT INTO urls ("shortUrl", url, "userId") VALUES ($1, $2, $3)`,
            [nanoid(8), url, user.id]
        );

        return res.sendStatus(201);
    } catch (error) {
        failure(error);
        return res.sendStatus(500);
    }
}

export async function getUrl(req, res) {
    const { url } = res.locals;

    delete url.createdAt;
    delete url.userId;

    return res.status(200).send(url);
}

export async function openUrl(req, res) {
    const { url } = res.locals.url;

    res.redirect(url);
}
