const service = require('../services/questionSetService');
const { questionSetResource } = require('../resources/questionSetResource');
const { ok, created } = require('../http/response');

function list(req, res) { return ok(res, { questionSets: service.list(req.user.id).map(questionSetResource) }); }
function create(req, res) { return created(res, { questionSet: questionSetResource(service.create(req.user.id, req.body)) }, 'Bank soal berhasil dibuat.'); }
function detail(req, res) { return ok(res, { questionSet: questionSetResource(service.detail(req.params.setId, req.user.id)) }); }
function update(req, res) { return ok(res, { questionSet: questionSetResource(service.update(req.params.setId, req.user.id, req.body)) }, 'Bank soal berhasil diperbarui.'); }
function addQuestion(req, res) { return created(res, { questionSet: questionSetResource(service.addQuestion(req.params.setId, req.user.id, req.body)) }, 'Soal berhasil ditambahkan.'); }
function updateQuestion(req, res) { return ok(res, { questionSet: questionSetResource(service.updateQuestion(req.params.setId, req.params.questionId, req.user.id, req.body)) }, 'Soal berhasil diperbarui.'); }
function deleteQuestion(req, res) { return ok(res, { questionSet: questionSetResource(service.deleteQuestion(req.params.setId, req.params.questionId, req.user.id)) }, 'Soal berhasil dihapus.'); }
function lock(req, res) { return ok(res, { questionSet: questionSetResource(service.lock(req.params.setId, req.user.id)) }, 'Bank soal berhasil dikunci.'); }
function remove(req, res) { service.remove(req.params.setId, req.user.id); return ok(res, null, 'Bank soal berhasil dinonaktifkan.'); }

module.exports = { list, create, detail, update, addQuestion, updateQuestion, deleteQuestion, lock, remove };
