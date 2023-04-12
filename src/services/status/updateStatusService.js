import { participantsRepository } from "../../repositories/participantsRepository.js";
export async function updateStatusService(name){
    const participant = await participantsRepository.getParticipantsByName(name);
    if (!participant) throw ""
    await participantsRepository.updateParticipantStatus(participant._id)
    
}