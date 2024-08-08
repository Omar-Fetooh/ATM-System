import Joi from "joi";
import { generalFields } from "../../utils/generalFields.js"

export const createAccount = {
    body: Joi.object({
        balance: Joi.number().required(),
    }),
    headers: generalFields.headers.required()
}

export const deposit = {
    body: Joi.object({
        amount: Joi.number().required(),
    }),
    headers: generalFields.headers.required()
}

export const withdraw = {
    body: Joi.object({
        amount: Joi.number().required(),
    }),
    headers: generalFields.headers.required()
}
