const { roomResource } = require('../resources/roomResource');
const service = require('../services/roomService');
const { ok, created } = require('../http/response');
function list(req, res) { return ok(res, { rooms: service.listRooms(req.user.id).map(roomResource) }); }
function create(req, res) { return created(res, { room: roomResource(service.createRoom(req.user.id, req.body)) }, 'Ruang berhasil dibuat.'); }
function byToken(req, res) { return ok(res, { room: roomResource(service.findOpenByToken(req.params.token)) }); }
function detail(req, res) { const room = service.findRoom(req.params.roomId); if (req.user.role === 'guru' && room.guruId !== req.user.id) return res.status(404).json({ error: { code: 'ROOM_NOT_FOUND', message: 'Ruang tidak ditemukan.' } }); return ok(res, { room: roomResource(room) }); }
function close(req, res) { return ok(res, { room: roomResource(service.closeRoom(req.params.roomId, req.user.id)) }, 'Ruang berhasil ditutup.'); }
function startAttempt(req, res) { return created(res, service.startAttempt(req.params.roomId, req.user.id), 'Attempt siap.'); }
function saveAnswers(req, res) { return ok(res, { attempt: service.saveAnswers(req.params.roomId, req.params.attemptId, req.user.id, req.body.answers || {}) }, 'Jawaban tersimpan.'); }
function submit(req, res) { return ok(res, { attempt: service.submitAttempt(req.params.roomId, req.params.attemptId, req.user.id, req.body.answers || {}) }, 'Jawaban berhasil dikumpulkan.'); }
module.exports = { list, create, byToken, detail, close, startAttempt, saveAnswers, submit };
