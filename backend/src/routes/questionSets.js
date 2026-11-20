const express = require('express');
const controller = require('../controllers/questionSetController');
const { requireAuth } = require('../middleware/auth');
const { validate } = require('../validators/validate');
const { setId, questionId, createSet, updateSet, question } = require('../validators/questionSetValidator');

const router = express.Router();
router.use(requireAuth);
router.get('/', controller.list);
router.post('/', createSet, validate, controller.create);
router.get('/:setId', setId, validate, controller.detail);
router.patch('/:setId', [...setId, ...updateSet], validate, controller.update);
router.delete('/:setId', setId, validate, controller.remove);
router.post('/:setId/lock', setId, validate, controller.lock);
router.post('/:setId/questions', [...setId, ...question], validate, controller.addQuestion);
router.patch('/:setId/questions/:questionId', [...setId, ...question], validate, controller.updateQuestion);
router.delete('/:setId/questions/:questionId', [...setId, ...questionId], validate, controller.deleteQuestion);

module.exports = router;
