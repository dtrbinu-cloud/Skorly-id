const { body } = require('express-validator');
const createRoom = [body('judul').trim().isLength({ min: 3, max: 150 }), body('questions').isArray({ min: 1 }), body('durasiMenit').optional().isInt({ min: 1, max: 600 })];
module.exports = { createRoom };
