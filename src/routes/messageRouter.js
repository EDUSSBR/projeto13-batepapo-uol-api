import express from "express";
import { messageSchema } from "../entities/schemas/messageSchema.js";
import { getMessagesService } from "../services/messages/getMessagesService.js";
import { createMessagesService } from "../services/messages/createMessageService.js";
// import { createMessagesService } from "../services/messages/createMessagesService.js";
const router = express.Router()

router.post("/messages", async (req, res) => {
    try {
    const incommingMessage = {to: req.body.to.trim(), text: req.body.text.trim(), type: req.body.type.trim() }
    const from  = req.headers.user.trim()
    await messageSchema.validateAsync({...incommingMessage, from})
    await createMessagesService({...incommingMessage, from})
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

export default router;