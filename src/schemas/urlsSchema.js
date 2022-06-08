import Joi from "joi";

const urlsSchema = Joi.string().uri().required();

export default urlsSchema;
