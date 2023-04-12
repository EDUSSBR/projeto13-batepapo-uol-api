let db = await import('../db/index.js')
db = await db.default

export const participantsRepository = {
    db,
    getParticipantsByName: function getParticipantsByName(name) {
        return db.collection("participants").findOne({ name })
    },
    getParticipants: function getParticipants() {
        return db.collection("participants").find().toArray()
    },
    createParticipant: function createParticipant(participant) {
        return db.collection("participants").insertOne(participant)
    },
}