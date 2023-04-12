let db = await import('../db/index.js')
db = await db.default

export const messagesRepository = {
    db,
    createMessage: function createMessage(message) {
        return this.db.collection("messages").insertOne(message)
    },
}