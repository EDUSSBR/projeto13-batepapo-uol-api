import express from "express";
import { messageSchema } from "../entities/schemas/messageSchema.js";
import { getMessagesService } from "../services/messages/getMessagesService.js";
import { createMessagesService } from "../services/messages/createMessageService.js";
import { removeMessageByIdService } from "../services/messages/removeMessageByIdService.js";
import { updateMessageService } from "../services/messages/updateMessageService.js";
import { stripHtml } from "string-strip-html";
const router = express.Router()

router.post("/messages", async (req, res) => {
    try {
        const incommingMessage = { to: stripHtml(req.body.to).result.trim(), text: stripHtml(req.body.text).result.trim(), type: stripHtml(req.body.type).result.trim() }
        const from = stripHtml(req.headers.user).result.trim()
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
        const limit = req.query.limit?.trim()
        if (limit !==undefined && (limit<1 || !/^[0-9]+$/.test(limit))) {
            throw ""
        }
        const user = req.headers.user.trim()
        const messages = await getMessagesService()
        const filteredMessages = messages.filter(message=> message.type==="message" || message.type==="status" || (message.type==="private_message" && message.from===user) || (message.type==="private_message" &&  message.to===user))
        if (limit>0){
            res.send(filteredMessages.slice(-Number(limit)))
            return
        }
        res.send(filteredMessages)
    } catch (e) {
        console.log(e)
        res.status(422).send()
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