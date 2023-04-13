import { messagesRepository } from "../../repositories/messagesRepository.js"
import { participantsRepository } from "../../repositories/participantsRepository.js"
export async function removeMessageByIdService(participant, id) {
    const message = await  messagesRepository.getMessageById(id)
    if (participant === null || message === null) {
        throw { status: 404 }
    } else if (participant !== message.from) {
        throw { status: 401 }
    } else {
        messagesRepository.deleteMessageById(id)
    }

    return message
}