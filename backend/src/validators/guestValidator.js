const { body } = require('express-validator');
const guestJoin = [body('token').trim().isLength({ min: 6, max: 6 }).matches(/^[A-Za-z0-9]+$/), body('nama').trim().isLength({ min: 2, max: 100 })];
module.exports = { guestJoin };
