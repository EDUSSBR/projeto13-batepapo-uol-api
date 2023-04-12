import { participantsRepository } from "../../repositories/participantsRepository.js";

export async function getParticipantsService() {
    const participants = await participantsRepository.getParticipants()
    return participants
}