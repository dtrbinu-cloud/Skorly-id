function userResource(user) { const { passwordHash, ...safe } = user; return safe; }
module.exports = { userResource };
