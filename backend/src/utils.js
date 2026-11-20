const crypto = require('crypto');

const publicUser = ({ passwordHash, role, ...user }) => user;
const id = () => crypto.randomUUID();
const token = () => {
  const alphabet = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  return Array.from({ length: 6 }, () => alphabet[crypto.randomInt(alphabet.length)]).join('');
};

module.exports = { publicUser, id, token };
