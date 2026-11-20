const test = require('node:test');
const assert = require('node:assert/strict');

const repository = require('../src/repositories/questionSetRepository');
const service = require('../src/services/questionSetService');

const questionInput = {
  teks: 'Hasil dari 2 + 2 adalah ...',
  opsi: { A: '2', B: '3', C: '4', D: '5', E: '6' },
  kunci: 'C',
};

function setUp() {
  return {
    id: 'set-1',
    userId: 'user-1',
    judul: 'Matematika',
    status: 'draf',
    questions: [],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
}

function mockRepository(initialSet) {
  let current = structuredClone(initialSet);
  const originals = {
    findById: repository.findById,
    update: repository.update,
    create: repository.create,
    allByUser: repository.allByUser,
  };
  repository.findById = () => current && !current.deletedAt ? current : undefined;
  repository.update = (_id, changes) => { current = { ...current, ...changes }; return current; };
  repository.create = set => { current = set; return set; };
  repository.allByUser = userId => current && current.userId === userId && !current.deletedAt ? [current] : [];
  return { get current() { return current; }, restore() { Object.assign(repository, originals); } };
}

test('user lain tidak dapat mengakses question set', () => {
  const mock = mockRepository(setUp());
  try {
    assert.throws(() => service.detail('set-1', 'user-2'), error => error.code === 'QUESTION_SET_NOT_FOUND' && error.status === 404);
  } finally { mock.restore(); }
});

test('question set harus memiliki soal sebelum dikunci', () => {
  const mock = mockRepository(setUp());
  try {
    assert.throws(() => service.lock('set-1', 'user-1'), error => error.code === 'QUESTION_SET_EMPTY' && error.status === 422);
  } finally { mock.restore(); }
});

test('question set yang dikunci tidak dapat diubah dan dapat dibuat snapshot room', () => {
  const draft = setUp();
  draft.questions = [{ id: 'q-1', nomor: 1, teks: questionInput.teks, opsi: questionInput.opsi, kunci: 'C', createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() }];
  draft.status = 'siap';
  const mock = mockRepository(draft);
  try {
    assert.throws(() => service.addQuestion('set-1', 'user-1', questionInput), error => error.code === 'QUESTION_SET_LOCKED' && error.status === 409);
    const snapshot = service.snapshotForRoom('set-1', 'user-1');
    assert.equal(snapshot.questionSetId, 'set-1');
    assert.deepEqual(snapshot.answerKey, { 'q-1': 'C' });
    assert.deepEqual(snapshot.questions[0].opsi[2], { kode: 'C', teks: '4' });
  } finally { mock.restore(); }
});

test('soal dapat ditambahkan ke draft dan question set di-soft-delete', () => {
  const mock = mockRepository(setUp());
  try {
    const updated = service.addQuestion('set-1', 'user-1', questionInput);
    assert.equal(updated.questions.length, 1);
    assert.equal(updated.questions[0].nomor, 1);
    service.remove('set-1', 'user-1');
    assert.ok(mock.current.deletedAt);
  } finally { mock.restore(); }
});
