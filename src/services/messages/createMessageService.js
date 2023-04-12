import { messagesRepository } from "../../repositories/messagesRepository.js"
import { participantsRepository } from "../../repositories/participantsRepository.js"
import { createMessage } from "../../entities/message.js"

// export function createMessage(from, text, to="todos", type="status", time=new Date().toLocaleTimeString())
export async function createMessagesService({ from, text, to, type }) {
    const participant = await participantsRepository.getParticipantsByName(from)
    if (participant === null) {
        throw { message: "user does not exists", status: 422 }
    }
    const message = createMessage(from, text, to, type);
    console.log(message)
    await messagesRepository.createMessage(message);
}