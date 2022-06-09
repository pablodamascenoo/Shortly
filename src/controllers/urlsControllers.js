import db from "../db.js";
import { nanoid } from "nanoid";
import { failure, success } from "../misc/chalkAlerts.js";

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
    const { url } = res.locals;

    try {
        await db.query(`INSERT INTO "urlsHistory" ("urlId") VALUES ($1)`, [
            Number(url.id),
        ]);
        return res.redirect(url.url);
    } catch (error) {
        failure(error);
        return res.sendStatus(500);
    }
}

export async function deleteUrl(req, res) {
    const { url } = res.locals;

    try {
        await db.query("DELETE FROM urls WHERE id=$1", [url.id]);

        return res.sendStatus(204);
    } catch (error) {
        failure(error);
        return res.sendStatus(500);
    }
}
