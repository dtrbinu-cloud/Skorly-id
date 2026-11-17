const service = require('../services/roomService');
const { ok } = require('../http/response');
function detail(req, res) { return ok(res, service.getGuestAttempt(req.params.attemptId, req.get('x-attempt-token'))); }
function save(req, res) { return ok(res, { attempt: service.saveGuestAttempt(req.params.attemptId, req.get('x-attempt-token'), req.body.answers || {}) }, 'Jawaban tersimpan.'); }
function submit(req, res) { return ok(res, { attempt: service.submitGuestAttempt(req.params.attemptId, req.get('x-attempt-token'), req.body.answers || {}) }, 'Jawaban berhasil dikumpulkan.'); }
module.exports = { detail, save, submit };
