function ok(res, data, message = 'OK', meta) {
  const body = { data, message };
  if (meta !== undefined) body.meta = meta;
  return res.json(body);
}

function created(res, data, message = 'Data berhasil dibuat') {
  return res.status(201).json({ data, message });
}

module.exports = { ok, created };
