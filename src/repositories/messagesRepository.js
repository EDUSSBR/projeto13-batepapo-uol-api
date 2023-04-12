let db = await import('../db/index.js')
db = await db.default

export const messagesRepository = {
    db: db.collection("messages"),
    getMessages: function getMessages(){
        return this.db.find({}).toArray()
    },
    // createMessage: function createMessage(message) {
    //     return this.db.find
    // },
}