import Joi from "joi";
export const participantSchema = Joi.object({
    id: Joi.string().length(24).pattern(/[0-9a-fA-F]+/),
    name: Joi.string().min(3).max(30).required(),
    lastStatus: Joi.date().timestamp()
})