const express = require('express');
const controller = require('../controllers/attemptController');
const router = express.Router();
router.get('/:attemptId', controller.detail);
router.patch('/:attemptId', controller.save);
router.post('/:attemptId/submit', controller.submit);
module.exports = router;
