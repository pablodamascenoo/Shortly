import pkg from "joi-translation-pt-br";
import urlsSchema from "../schemas/urlsSchema.js";
import { warning } from "../misc/chalkAlerts.js";
const { messages } = pkg;

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
