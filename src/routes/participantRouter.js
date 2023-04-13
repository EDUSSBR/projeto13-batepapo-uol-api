import express from "express";
import { participantSchema } from "../entities/schemas/participantSchema.js";
import { createParticipantService } from "../services/participants/createParticipantService.js";
import { getParticipantsService } from "../services/participants/getParticipantsService.js";
import { stripHtml } from "string-strip-html";

const router = express.Router()

router.post("/participants", async (req, res) => {
    try {
        if (req.body.name === undefined){
            return res.status(422).send()
        }
        const name = stripHtml(req.body?.name).result.trim()
        await participantSchema.validateAsync({ name })
        await createParticipantService({ name })
        res.status(201).send()
    } catch (e) {
        if (e.details !== undefined) {
            res.status(422).send({ message: `${e.details[0].message}` })
        } else if (e.status){
            console.log(e)
            res.status(e.status).send({ message: e.message })
        } else {
            res.status(422).send()
        }
    }
})

router.get("/participants", async (req, res) => {
    try {
        const participants = await getParticipantsService()
        return res.send(participants)
    } catch (e) {
        console.log(e)
        res.status(500).send()
    }
})

export default router; 