const { body, param } = require('express-validator');

const setId = [param('setId').isString().trim().notEmpty()];
const createSet = [body('judul').trim().isLength({ min: 3, max: 200 })];
const updateSet = [body('judul').trim().isLength({ min: 3, max: 200 })];
const questionId = [param('questionId').isString().trim().notEmpty()];
const question = [
  body('teks').trim().isLength({ min: 1, max: 10000 }),
  body('opsi').isObject(),
  body('opsi.A').trim().isLength({ min: 1, max: 500 }),
  body('opsi.B').trim().isLength({ min: 1, max: 500 }),
  body('opsi.C').trim().isLength({ min: 1, max: 500 }),
  body('opsi.D').trim().isLength({ min: 1, max: 500 }),
  body('opsi.E').trim().isLength({ min: 1, max: 500 }),
  body('kunci').isIn(['A', 'B', 'C', 'D', 'E']),
];

module.exports = { setId, questionId, createSet, updateSet, question };
