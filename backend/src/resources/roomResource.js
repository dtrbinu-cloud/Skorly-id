function roomResource(room) { const { answerKey, ...safe } = room; return safe; }
module.exports = { roomResource };
