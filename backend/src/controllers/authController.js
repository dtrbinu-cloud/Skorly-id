const { userResource } = require('../resources/userResource');
const service = require('../services/authService');
const { ok, created } = require('../http/response');
const refreshCookieOptions = { httpOnly: true, sameSite: 'lax', secure: process.env.NODE_ENV === 'production', path: '/api/auth', maxAge: 7 * 24 * 60 * 60 * 1000 };
async function register(req, res) { const user = await service.register(req.body); return created(res, { user: userResource(user) }, 'Akun berhasil dibuat.'); }
async function login(req, res) { const result = await service.login(req.body.email, req.body.password, req.ip); res.cookie('skorly_refresh', result.refreshToken, refreshCookieOptions); return ok(res, { user: userResource(result.user), accessToken: result.accessToken }, 'Login berhasil.'); }
function logout(req, res) { service.logout(req.cookies.skorly_refresh); return res.clearCookie('skorly_refresh', refreshCookieOptions).json({ data: null, message: 'Berhasil keluar.' }); }
function refresh(req, res) { const result = service.refresh(req.cookies.skorly_refresh); res.cookie('skorly_refresh', result.refreshToken, refreshCookieOptions); return ok(res, { user: userResource(result.user), accessToken: result.accessToken }, 'Sesi diperbarui.'); }
function me(req, res) { return ok(res, { user: userResource(req.user) }); }
async function updateProfile(req, res) { return ok(res, { user: await service.updateProfile(req.user.id, req.body.nama) }, 'Profil berhasil diperbarui.'); }
async function changePassword(req, res) { await service.changePassword(req.user.id, req.body.passwordLama, req.body.passwordBaru); return ok(res, null, 'Kata sandi berhasil diubah.'); }
module.exports = { register, login, logout, refresh, me, updateProfile, changePassword };
