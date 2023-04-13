import Joi from "joi";

export const messageSchema =  Joi.object({
    id: Joi.string().length(24).pattern(/[0-9a-fA-F]+/),
    from: Joi.string().min(3).max(30).required(),
    to: Joi.string().min(3).max(30).required(),
    text: Joi.string().max(500).required(),
    type: Joi.string().valid("private_message", "message"),
})