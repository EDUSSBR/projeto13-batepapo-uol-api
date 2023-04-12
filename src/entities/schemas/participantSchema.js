import Joi from "joi";
export const participantSchema = Joi.object({
    name: Joi.string().min(3).max(30).required(),
    lastStatus: Joi.date().timestamp()
})