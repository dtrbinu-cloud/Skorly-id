const { readDb, writeDb } = require('../store');
function findByEmail(email) { return readDb().users.find(user => user.email === email); }
function findById(id) { return readDb().users.find(user => user.id === id); }
function create(user) { const db = readDb(); db.users.push(user); writeDb(db); return user; }
function update(id, changes) { const db = readDb(); const user = db.users.find(item => item.id === id); if (!user) return null; Object.assign(user, changes); writeDb(db); return user; }
function saveRefreshToken(value) { const db = readDb(); db.refreshTokens = db.refreshTokens || []; db.refreshTokens.push(value); writeDb(db); return value; }
function findRefreshToken(hash) { return (readDb().refreshTokens || []).find(item => item.tokenHash === hash); }
function revokeRefreshToken(hash) { const db = readDb(); const item = (db.refreshTokens || []).find(value => value.tokenHash === hash); if (item) { item.revokedAt = new Date().toISOString(); writeDb(db); } return item; }
function revokeUserRefreshTokens(userId) { const db = readDb(); const now = new Date().toISOString(); (db.refreshTokens || []).filter(item => item.userId === userId && !item.revokedAt).forEach(item => { item.revokedAt = now; }); writeDb(db); }
function recordLoginAttempt(value) { const db = readDb(); db.loginAttempts = db.loginAttempts || []; db.loginAttempts.push(value); writeDb(db); }
function countRecentFailures(key, windowMs) { return (readDb().loginAttempts || []).filter(item => item.key === key && !item.success && Date.now() - new Date(item.createdAt).getTime() < windowMs).length; }
module.exports = { findByEmail, findById, create, update, saveRefreshToken, findRefreshToken, revokeRefreshToken, revokeUserRefreshTokens, recordLoginAttempt, countRecentFailures };
