const fs = require('fs');
const path = require('path');

const root = path.join(__dirname, '..');
const required = ['src/controllers', 'src/repositories', 'src/resources', 'src/services', 'src/validators'];
const errors = [];

for (const dir of required) if (!fs.existsSync(path.join(root, dir))) errors.push(`ERROR: ${dir} tidak ditemukan.`);

function files(dir) {
  if (!fs.existsSync(dir)) return [];
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap(item => item.isDirectory() ? files(path.join(dir, item.name)) : [path.join(dir, item.name)]);
}

for (const file of files(path.join(root, 'src/controllers'))) {
  if (!file.endsWith('.js')) continue;
  const text = fs.readFileSync(file, 'utf8');
  if (/readDb|writeDb|require\(['"].*repositories/.test(text)) errors.push(`ERROR: ${path.relative(root, file)} tidak boleh mengakses storage/repository langsung; gunakan service.`);
}

for (const file of files(path.join(root, 'database'))) {
  if (!file.endsWith('.sql')) continue;
  const text = fs.readFileSync(file, 'utf8');
  if (/ON DELETE\s+CASCADE|ON UPDATE\s+CASCADE/i.test(text)) errors.push(`ERROR: ${path.relative(root, file)} menggunakan cascade delete/update.`);
}

if (errors.length) { console.error(errors.join('\n')); process.exit(1); }
console.log('Node.js API SOP check passed.');
