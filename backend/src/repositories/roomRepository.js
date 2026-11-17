const { readDb, writeDb } = require('../store');
function listByGuru(guruId) { return readDb().rooms.filter(room => room.guruId === guruId); }
function findById(id) { return readDb().rooms.find(room => room.id === id); }
function findByToken(token) { return readDb().rooms.find(room => room.token === token); }
function tokenExists(token) { return Boolean(findByToken(token)); }
function create(room) { const db = readDb(); db.rooms.push(room); writeDb(db); return room; }
function update(id, changes) { const db = readDb(); const room = db.rooms.find(item => item.id === id); if (!room) return null; Object.assign(room, changes); writeDb(db); return room; }
function listAttempts() { return readDb().attempts; }
function findAttempt(id) { return readDb().attempts.find(item => item.id === id); }
function findAttemptByGuestToken(hash) { return readDb().attempts.find(item => item.guestTokenHash === hash); }
function saveAttempt(attempts) { const db = readDb(); db.attempts = attempts; writeDb(db); }
module.exports = { listByGuru, findById, findByToken, tokenExists, create, update, listAttempts, findAttempt, findAttemptByGuestToken, saveAttempt };
