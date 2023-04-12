let db = await import('../db/index.js')
db = await db.default

export const participantsRepository = {
    db,
    getParticipantsByName: function getParticipantsByName(name) {
        return db.collection("participants").findOne({ name })
    },
    createParticipant: function createParticipant(participant) {
        return db.collection("participants").insertOne(participant)
    },
}