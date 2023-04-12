import { createParticipant } from "../entities/participants.js";
import { createMessage } from "../entities/message.js";
import { participantsRepository } from "../repositories/participantsRepository.js";
import { messagesRepository } from "../repositories/messagesRepository.js";


export async function createUserService({ name }) {
    const participants = await participantsRepository.getParticipantsByName(name)
    if (participants !== null) {
        throw { message: "User already exists", status: 409 }
    }
    const participant = createParticipant(name)
    const message = createMessage(participant.name, "entra na sala...")
    await Promise.all([
        participantsRepository.createParticipant(participant),
        messagesRepository.createMessage(message),
    ])
}