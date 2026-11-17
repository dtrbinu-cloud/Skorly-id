const fs = require('fs');
const path = require('path');

const dataDir = path.join(__dirname, '..', 'data');
const dbFile = path.join(dataDir, 'db.json');
const emptyDb = { users: [], rooms: [], attempts: [], refreshTokens: [], loginAttempts: [] };

function readDb() {
  fs.mkdirSync(dataDir, { recursive: true });
  if (!fs.existsSync(dbFile)) fs.writeFileSync(dbFile, JSON.stringify(emptyDb, null, 2));
  return JSON.parse(fs.readFileSync(dbFile, 'utf8'));
}

function writeDb(db) {
  fs.mkdirSync(dataDir, { recursive: true });
  const temp = `${dbFile}.tmp`;
  fs.writeFileSync(temp, JSON.stringify(db, null, 2));
  fs.renameSync(temp, dbFile);
}

module.exports = { readDb, writeDb };
