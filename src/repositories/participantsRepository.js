let db = await import('../db/index.js')
db = await db.default

export const participantsRepository = {
    db: db.collection("participants"),
    getParticipantsByName: function getParticipantsByName(name) {
        return this.db.findOne({ name })
    },
    getParticipants: function getParticipants() {
        return this.db.find().toArray()
    },
    createParticipant: function createParticipant(participant) {
        return this.db.insertOne(participant)
    },
    updateParticipantStatus: function updateParticipantStatus(id) {
        return this.db.updateOne({ _id: id }, {$set : { lastStatus: Date.now()}})
    }
}