import express from "express";
import { getMessagesService } from "../services/messages/getMessagesService.js";
const router = express.Router()

router.post("/messages", async (req, res) => {
    
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