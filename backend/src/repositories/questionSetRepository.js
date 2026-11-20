const { readDb, writeDb } = require('../store');

function allByUser(userId) {
  return (readDb().questionSets || []).filter(set => set.userId === userId && !set.deletedAt);
}

function findById(id) {
  return (readDb().questionSets || []).find(set => set.id === id && !set.deletedAt);
}

function create(set) {
  const db = readDb();
  db.questionSets = db.questionSets || [];
  db.questionSets.push(set);
  writeDb(db);
  return set;
}

function update(id, changes) {
  const db = readDb();
  const set = (db.questionSets || []).find(item => item.id === id && !item.deletedAt);
  if (!set) return null;
  Object.assign(set, changes);
  writeDb(db);
  return set;
}

module.exports = { allByUser, findById, create, update };
