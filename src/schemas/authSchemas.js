import Joi from "joi";

export const signUpSchema = Joi.object({
    name: Joi.string().required().min(5),
    email: Joi.string().email().required(),
    password: Joi.string().required(),
    repassword: Joi.string()
        .required()
        .valid(Joi.ref("password"))
        .messages({ "any.only": "{{#label}} does not match" }),
});

export const signInSchema = Joi.object({
    email: Joi.string().email().required,
    password: Joi.string().required(),
});
