import express from "express";
import cors from "cors";
import participantsRouter from './participantRouter.js';
import messagesRouter from './messageRouter.js';
import status from './statusRouter.js'
import { getParticipantsService } from "../services/participants/getParticipantsService.js";
import { createMessage } from "../entities/message.js";
import { messagesRepository } from "../repositories/messagesRepository.js";
import { participantsRepository } from "../repositories/participantsRepository.js";

const app = express();

app.use(express.json());
app.use(cors());
app.use(participantsRouter);
app.use(messagesRouter);
app.use(status);

setInterval(async () => {
    try{
        const participants = await getParticipantsService()
        if (participants.length===0 || participants===null) return 
        for (let i=0; i<participants.length; i++){
            if (Date.now() - participants[i].lastStatus > 10000) {
                const message = createMessage(participants[i].name, "sai da sala...")
                messagesRepository.createMessage(message)
                participantsRepository.removeParticipant(participants[i]._id)
            } 
        }
    } catch (e){
        console.log(e)
    }
}, 15000)

export default app