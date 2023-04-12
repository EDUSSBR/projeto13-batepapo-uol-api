import express from "express";
import { createParticipant } from "../entities/participants.js";
import { participantSchema } from "../entities/schemas/participantSchema.js";
import { createUserService } from "../services/createUserService.js";
import { getUsersService } from "../services/getUsersService.js";
const router = express.Router()

router.post("/participants", async (req, res) => {
    const { name } = req.body
    const newParticipant = createParticipant(name, "123")
    try {
        const participant = await participantSchema.validateAsync({ name })
        await createUserService({ name })
        res.status(201).send()
    } catch (e) {
        if (e.details !== undefined) {
            res.status(422).send({ message: `${e.details[0].message}` })
        } else {
            console.log(e)
            res.status(e.status).send({ message: e.message })
        }
    }
})

router.get("/participants", async (req, res) => {
    try{
        const participants = await getUsersService()
        return res.send(participants)
    } catch (e) {
        console.log(e)
        res.status(500).send()
    }
})

export default router; 