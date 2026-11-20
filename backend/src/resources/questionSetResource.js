function questionResource(question) {
  return {
    id: question.id,
    nomor: question.nomor,
    teks: question.teks,
    opsi: question.opsi,
    kunci: question.kunci,
    createdAt: question.createdAt,
    updatedAt: question.updatedAt,
  };
}

function questionSetResource(set) {
  const questions = set.questions || [];
  return {
    id: set.id,
    userId: set.userId,
    judul: set.judul,
    status: set.status,
    jumlahSoal: questions.length,
    questions: questions.map(questionResource),
    createdAt: set.createdAt,
    updatedAt: set.updatedAt,
    lockedAt: set.lockedAt || null,
    deletedAt: set.deletedAt || null,
  };
}

module.exports = { questionSetResource, questionResource };
