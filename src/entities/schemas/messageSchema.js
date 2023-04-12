import Joi from "joi";

export const messageSchema =  Joi.object({
    from: Joi.string().min(3).max(30).required(),
    to: Joi.string().min(3).max(30).required(),
    text: Joi.string().max(500).required(),
    type: Joi.string().valid("private_message", "message"),
})