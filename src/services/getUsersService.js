import { participantsRepository } from "../repositories/participantsRepository.js";

export async function getUsersService() {
    const participants = await participantsRepository.getParticipants()
    return participants
}