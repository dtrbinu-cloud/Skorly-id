const { readDb, writeDb } = require('../store');
function findByEmail(email) { return readDb().users.find(user => user.email === email); }
function findById(id) { return readDb().users.find(user => user.id === id); }
function create(user) { const db = readDb(); db.users.push(user); writeDb(db); return user; }
function update(id, changes) { const db = readDb(); const user = db.users.find(item => item.id === id); if (!user) return null; Object.assign(user, changes); writeDb(db); return user; }
module.exports = { findByEmail, findById, create, update };
