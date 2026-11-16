const { body } = require('express-validator');
const credentials = [body('email').isEmail().normalizeEmail(), body('password').isLength({ min: 8 })];
const register = [body('nama').trim().isLength({ min: 2, max: 100 }), ...credentials, body('role').optional().isIn(['guru', 'murid'])];
const profile = [body('nama').trim().isLength({ min: 2, max: 100 })];
const password = [body('passwordLama').isString(), body('passwordBaru').isLength({ min: 8 })];
module.exports = { credentials, register, profile, password };
