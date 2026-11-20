function userResource(user) { const { passwordHash, role, ...safe } = user; return safe; }
module.exports = { userResource };
