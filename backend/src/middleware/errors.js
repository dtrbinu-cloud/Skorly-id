function notFound(_req, res) {
  res.status(404).json({ message: 'Endpoint tidak ditemukan.' });
}

function errorHandler(err, _req, res, _next) {
  console.error(err);
  res.status(err.status || 500).json({ error: { code: err.code || 'INTERNAL_ERROR', message: err.status ? err.message : 'Terjadi kesalahan pada server.', details: err.details || [] } });
}

module.exports = { notFound, errorHandler };
