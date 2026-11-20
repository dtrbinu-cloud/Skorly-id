function roomResource(room) { const { answerKey, guruId, ...safe } = room; return { ...safe, ...(safe.userId ? {} : guruId ? { userId: guruId } : {}) }; }
module.exports = { roomResource };
