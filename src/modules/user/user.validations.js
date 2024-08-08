import Joi from "joi";

export const register = {
    body: Joi.object({
        username: Joi.string().required(),
        password: Joi.string().required()
    }),
}

export const login = {
    body: Joi.object({
        username: Joi.string().required(),
        password: Joi.string().required()
    }),
}
