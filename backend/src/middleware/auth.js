const jwt = require('jsonwebtoken');
const { readDb } = require('../store');

const secret = () => process.env.JWT_SECRET || 'dev-only-change-this-secret';

function signUser(user) {
  return jwt.sign({ sub: user.id }, secret(), { expiresIn: process.env.JWT_EXPIRES_IN || '7d' });
}

function requireAuth(req, res, next) {
  const header = req.get('authorization');
  const token = header && header.startsWith('Bearer ') ? header.slice(7) : (req.cookies.skorly_access || req.cookies.skorly_token);
  if (!token) return res.status(401).json({ message: 'Autentikasi diperlukan.' });
  try {
    const payload = jwt.verify(token, secret());
    const user = readDb().users.find(item => item.id === payload.sub);
    if (!user || ['nonaktif', 'ditolak', 'menunggu'].includes(user.status)) return res.status(401).json({ error: { code: 'SESSION_INVALID', message: 'Sesi tidak valid.' } });
    req.user = user;
    next();
  } catch {
    return res.status(401).json({ error: { code: 'SESSION_EXPIRED', message: 'Sesi tidak valid atau sudah kedaluwarsa.' } });
  }
}

module.exports = { signUser, requireAuth };
