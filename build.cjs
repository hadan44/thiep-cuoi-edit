const fs = require('node:fs');
const path = require('node:path');
const root = __dirname;
const template = fs.readFileSync(path.join(root, 'index.template.html'), 'utf8');
const image = fs.readFileSync(path.join(root, 'ChatGPT Image 29 Oct 2026, 20_37_54.png')).toString('base64');
const html = template.replace('__IMAGE_DATA__', 'data:image/png;base64,' + image);
fs.writeFileSync(path.join(root, 'Thiep-cuoi.html'), html);
fs.writeFileSync(path.join(root, 'index.html'), html);
console.log('Built Thiep-cuoi.html and index.html');
