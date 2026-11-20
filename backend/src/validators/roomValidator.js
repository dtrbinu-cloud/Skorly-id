const { body } = require('express-validator');
const createRoom = [body('judul').trim().isLength({ min: 3, max: 150 }), body('questionSetId').optional().isString().trim().notEmpty(), body('questions').optional().isArray({ min: 1 }), body('durasiMenit').optional().isInt({ min: 1, max: 600 })];
const joinRoom = [body('token').trim().isLength({ min: 6, max: 6 }).matches(/^[A-Za-z0-9]+$/)];
module.exports = { createRoom, joinRoom };
