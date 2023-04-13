import { ObjectId } from 'mongodb'

let db = await import('../db/index.js')
db = await db.default

export const messagesRepository = {
    db: db.collection("messages"),
    getMessages: function getMessages(){
        return this.db.find({}).toArray()
    },
    getMessageById: function getMessageById(id){
        return this.db.findOne({_id: new ObjectId(id)})
    },
    deleteMessageById: function deleteMessageById(id){
        return this.db.deleteOne({_id: new ObjectId(id)})
    },
    createMessage: function createMessage(message) {
        return this.db.insertOne(message)
    },
    updateMessage: function updateMessage(id, message) {
        return this.db.updateOne({_id: new ObjectId(id)}, { $set: { text: message}})
    },
}