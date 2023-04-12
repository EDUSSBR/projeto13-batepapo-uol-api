import { messagesRepository } from "../../repositories/messagesRepository.js"
export async function getMessagesService(){
    const messages = await messagesRepository.getMessages()
    return messages
}