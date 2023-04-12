export function createParticipant(name, lastStatus = Date.now()) {
    return { name, lastStatus }
}