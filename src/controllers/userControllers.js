import db from "../db.js";
import { failure } from "../misc/chalkAlerts.js";

export async function getUser(req, res) {
    const { user } = res.locals;

    let count = 0;

    try {
        const userObj = await db.query(
            `SELECT u.id, u.name, ur.id as "urlId", ur.url, ur."shortUrl", ur.views
        FROM users u
        JOIN urls ur ON u.id = ur."userId"
        WHERE u.id = $1
        `,
            [user.id]
        );

        if (!userObj.rowCount) {
            const userInfo = {
                id: user.id,
                name: user.name,
                visitCount: 0,
                shortenedUrls: [],
            };

            return res.status(200).send(userInfo);
        }

        const shortenedUrls = userObj.rows.map((url) => {
            count += Number(url.views);

            const obj = {
                id: url.urlId,
                shortUrl: url.shortUrl,
                url: url.url,
                visitCount: url.views,
            };

            return obj;
        });

        const userInfo = {
            id: userObj.rows[0].id,
            name: userObj.rows[0].name,
            visitCount: count,
            shortenedUrls,
        };

        return res.status(200).send(userInfo);
    } catch (error) {
        failure(error);
        return res.status(500).send("erro no servidor!");
    }
}

export async function getRanking(req, res) {
    try {
        const users = await db.query(`
        SELECT u.id, u.name, count(ur) as "linksCount", SUM(ur.views) as "visitCount"
        FROM users u
        JOIN urls ur ON ur."userId"=u.id
        GROUP BY u.id, u.name
        ORDER BY "visitCount" DESC
        LIMIT 10
        `);

        return res.status(200).send(users.rows);
    } catch (error) {
        failure(error);
        return res.status(500).send("erro no servidor!");
    }
}
