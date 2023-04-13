import { messagesRepository } from "../../repositories/messagesRepository.js"
import { participantsRepository } from "../../repositories/participantsRepository.js"
import { createMessage } from "../../entities/message.js"

export async function updateMessageService({id, from, text}) {
    const messageExists = await messagesRepository.getMessageById(id);
    const participantExists = await participantsRepository.getParticipantsByName(from)

    console.log("text",text)
    // if (participantExists === null) {
    //     throw { message: "user does not exists", status: 422 }
    // }
    if (messageExists === null || participantExists===null){
        throw { status: 404}
    } else if (from !==messageExists.from){
        throw { status: 401}
    }
    await messagesRepository.updateMessage(id, text);
}