const fs = require('fs');
const path = require('path');

const DB_FILE = path.join(__dirname, 'licenses.json');

function readDB() {
    if (!fs.existsSync(DB_FILE)) return {};
    return JSON.parse(fs.readFileSync(DB_FILE));
}

function writeDB(data) {
    fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 4));
}

function generateKey() {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    const segment = () => Array.from({length: 5}, () => chars[Math.floor(Math.random() * chars.length)]).join('');
    return `TOXIC-${segment()}-${segment()}`;
}

const count = parseInt(process.argv[2]) || 1;
const db = readDB();

console.log(`Generating ${count} keys...`);

for (let i = 0; i < count; i++) {
    const key = generateKey();
    db[key] = {
        hwid: null,
        status: 'active',
        createdAt: new Date().toISOString()
    };
    console.log(`Generated: ${key}`);
}

writeDB(db);
console.log('Keys saved to licenses.json');
