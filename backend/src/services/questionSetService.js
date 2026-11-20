const { id } = require('../utils');
const repository = require('../repositories/questionSetRepository');
const { AppError } = require('../http/errors');

function ownedSet(setId, userId) {
  const set = repository.findById(setId);
  if (!set || set.userId !== userId) throw new AppError(404, 'QUESTION_SET_NOT_FOUND', 'Bank soal tidak ditemukan.');
  return set;
}

function questionsOf(set) { return set.questions || []; }

function ensureDraft(set) {
  if (set.status !== 'draf') throw new AppError(409, 'QUESTION_SET_LOCKED', 'Bank soal sudah dikunci dan tidak dapat diubah.');
}

function normalizeQuestion(input, nomor, existing = {}) {
  return {
    id: existing.id || id(),
    nomor,
    teks: input.teks.trim(),
    opsi: {
      A: input.opsi.A.trim(),
      B: input.opsi.B.trim(),
      C: input.opsi.C.trim(),
      D: input.opsi.D.trim(),
      E: input.opsi.E.trim(),
    },
    kunci: input.kunci,
    createdAt: existing.createdAt || new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
}

function list(userId) { return repository.allByUser(userId); }

function create(userId, input) {
  const now = new Date().toISOString();
  return repository.create({ id: id(), userId, judul: input.judul.trim(), status: 'draf', questions: [], createdAt: now, updatedAt: now });
}

function detail(setId, userId) { return ownedSet(setId, userId); }

function snapshotForRoom(setId, userId) {
  const set = ownedSet(setId, userId);
  if (set.status !== 'siap') throw new AppError(409, 'QUESTION_SET_NOT_READY', 'Bank soal harus dikunci sebelum dipakai untuk ruang.');
  const questions = questionsOf(set).map(question => ({
    id: question.id,
    teks: question.teks,
    opsi: Object.entries(question.opsi).map(([kode, teks]) => ({ kode, teks })),
  }));
  const answerKey = Object.fromEntries(questionsOf(set).map(question => [question.id, question.kunci]));
  return { questionSetId: set.id, questions, answerKey };
}

function update(setId, userId, input) {
  const set = ownedSet(setId, userId);
  ensureDraft(set);
  return repository.update(setId, { judul: input.judul.trim(), updatedAt: new Date().toISOString() });
}

function addQuestion(setId, userId, input) {
  const set = ownedSet(setId, userId);
  ensureDraft(set);
  const questions = questionsOf(set);
  const question = normalizeQuestion(input, questions.length + 1);
  return repository.update(setId, { questions: [...questions, question], updatedAt: new Date().toISOString() });
}

function updateQuestion(setId, questionId, userId, input) {
  const set = ownedSet(setId, userId);
  ensureDraft(set);
  const questions = questionsOf(set);
  const index = questions.findIndex(question => question.id === questionId);
  if (index < 0) throw new AppError(404, 'QUESTION_NOT_FOUND', 'Soal tidak ditemukan.');
  const updatedQuestions = [...questions];
  updatedQuestions[index] = normalizeQuestion(input, updatedQuestions[index].nomor, updatedQuestions[index]);
  return repository.update(setId, { questions: updatedQuestions, updatedAt: new Date().toISOString() });
}

function deleteQuestion(setId, questionId, userId) {
  const set = ownedSet(setId, userId);
  ensureDraft(set);
  const questions = questionsOf(set);
  if (!questions.some(question => question.id === questionId)) throw new AppError(404, 'QUESTION_NOT_FOUND', 'Soal tidak ditemukan.');
  const remainingQuestions = questions.filter(question => question.id !== questionId).map((question, index) => ({ ...question, nomor: index + 1 }));
  return repository.update(setId, { questions: remainingQuestions, updatedAt: new Date().toISOString() });
}

function lock(setId, userId) {
  const set = ownedSet(setId, userId);
  const questions = questionsOf(set);
  if (!questions.length) throw new AppError(422, 'QUESTION_SET_EMPTY', 'Bank soal harus memiliki minimal satu soal.');
  if (questions.some(question => !question.kunci)) throw new AppError(422, 'ANSWER_KEY_INCOMPLETE', 'Semua soal harus memiliki kunci jawaban.');
  return repository.update(setId, { status: 'siap', lockedAt: new Date().toISOString(), updatedAt: new Date().toISOString() });
}

function remove(setId, userId) {
  const set = ownedSet(setId, userId);
  return repository.update(setId, { deletedAt: new Date().toISOString(), updatedAt: new Date().toISOString() });
}

module.exports = { list, create, detail, snapshotForRoom, update, addQuestion, updateQuestion, deleteQuestion, lock, remove };
