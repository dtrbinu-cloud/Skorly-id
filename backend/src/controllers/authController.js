const { signUser } = require('../middleware/auth');
const { userResource } = require('../resources/userResource');
const service = require('../services/authService');
const { ok, created } = require('../http/response');
const cookieOptions = { httpOnly: true, sameSite: 'lax', secure: process.env.NODE_ENV === 'production', maxAge: 7 * 24 * 60 * 60 * 1000 };
async function register(req, res) { const user = await service.register(req.body); res.cookie('skorly_token', signUser(user), cookieOptions); return created(res, { user: userResource(user) }, 'Akun berhasil dibuat.'); }
async function login(req, res) { const user = await service.login(req.body.email, req.body.password); res.cookie('skorly_token', signUser(user), cookieOptions); return ok(res, { user: userResource(user) }, 'Login berhasil.'); }
function logout(_req, res) { return res.clearCookie('skorly_token', cookieOptions).json({ data: null, message: 'Berhasil keluar.' }); }
function me(req, res) { return ok(res, { user: userResource(req.user) }); }
async function updateProfile(req, res) { return ok(res, { user: await service.updateProfile(req.user.id, req.body.nama) }, 'Profil berhasil diperbarui.'); }
async function changePassword(req, res) { await service.changePassword(req.user.id, req.body.passwordLama, req.body.passwordBaru); return ok(res, null, 'Kata sandi berhasil diubah.'); }
module.exports = { register, login, logout, me, updateProfile, changePassword };
