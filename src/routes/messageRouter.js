import express from "express";
import { messageSchema } from "../entities/schemas/messageSchema.js";
import { getMessagesService } from "../services/messages/getMessagesService.js";
import { createMessagesService } from "../services/messages/createMessageService.js";
import { removeMessageByIdService } from "../services/messages/removeMessageByIdService.js";
import { updateMessageService } from "../services/messages/updateMessageService.js";
const router = express.Router()

router.post("/messages", async (req, res) => {
    try {
        const incommingMessage = { to: req.body.to.trim(), text: req.body.text.trim(), type: req.body.type.trim() }
        const from = req.headers.user.trim()
        await messageSchema.validateAsync({ ...incommingMessage, from })
        await createMessagesService({ ...incommingMessage, from })
        res.status(201).send()
    } catch (e) {
        console.log(e)
        res.status(422).send()
    }
})
router.get("/messages", async (req, res) => {
    try {
        const messages = await getMessagesService()
        res.status(200).send(messages)
    } catch (e) {
        console.log(e)
        res.status(500).send()
    }
})

router.delete("/messages/:id", async (req, res) => {
    try {
        const participant = req.headers.user;
        const { id } = req.params;
        if (id.length !== 24) {
            throw { status: 404 }
        }
        console.log(participant, id)
        await removeMessageByIdService(participant, id)
        res.send()
    } catch (e) {
        console.log(e)
        if (e.status) {
            res.status(e.status).send()
        }
        res.status(500).send()
    }
})

router.put("/messages/:id", async (req, res) => {
    try {
        const { to, text, type } = req.body
        const from = req.headers.user
        const { id } = req.params
        const message= { id, from, to, text, type }
        await messageSchema.validateAsync(message)
        await updateMessageService(message)
        res.send()
    } catch (e) {
        console.log("ERROR: ", e)
        if (e.details !== undefined) {
            if (e.details[0].path[0] === 'id') {
                res.status(404).send()
            }
            res.status(422).send()
        } else if (e.status) {
            res.status(e.status).send()
        } else {
            console.log(e)
            res.status(500).send()
        }
    }
})

export default router;