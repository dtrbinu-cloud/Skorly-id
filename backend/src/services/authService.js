const bcrypt = require('bcryptjs');
const { id, publicUser } = require('../utils');
const repository = require('../repositories/authRepository');
const { AppError } = require('../http/errors');
async function register(input) { const email = input.email.toLowerCase(); if (repository.findByEmail(email)) throw new AppError(409, 'EMAIL_EXISTS', 'Email sudah terdaftar.'); const user = { id: id(), nama: input.nama.trim(), email, role: input.role || 'murid', passwordHash: await bcrypt.hash(input.password, 12), createdAt: new Date().toISOString() }; return publicUser(repository.create(user)); }
async function login(email, password) { const user = repository.findByEmail(email.toLowerCase()); if (!user || !(await bcrypt.compare(password, user.passwordHash))) throw new AppError(401, 'INVALID_CREDENTIALS', 'Email atau kata sandi salah.'); return user; }
async function updateProfile(userId, nama) { return publicUser(repository.update(userId, { nama: nama.trim() })); }
async function changePassword(userId, oldPassword, newPassword) { const user = repository.findById(userId); if (!user || !(await bcrypt.compare(oldPassword, user.passwordHash))) throw new AppError(401, 'INVALID_PASSWORD', 'Kata sandi saat ini salah.'); repository.update(userId, { passwordHash: await bcrypt.hash(newPassword, 12) }); }
module.exports = { register, login, updateProfile, changePassword };
