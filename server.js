const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

const DB_FILE = path.join(__dirname, 'licenses.json');

// Ensure database file exists
if (!fs.existsSync(DB_FILE)) {
    fs.writeFileSync(DB_FILE, JSON.stringify({}));
}

function readDB() {
    return JSON.parse(fs.readFileSync(DB_FILE));
}

function writeDB(data) {
    fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 4));
}

app.get('/validate', (req, res) => {
    const { key, hwid } = req.query;

    if (!key || !hwid) {
        return res.status(400).json({ success: false, message: 'Key and HWID required' });
    }

    const db = readDB();

    if (!db[key]) {
        return res.json({ success: false, message: 'Licença inválida ou inexistente.' });
    }

    const license = db[key];

    if (license.status === 'deleted') {
        return res.json({ success: false, message: 'Esta licença foi excluída.' });
    }

    if (!license.hwid) {
        // First time use, bind to this HWID
        license.hwid = hwid;
        license.activatedAt = new Date().toISOString();
        writeDB(db);
        return res.json({ success: true, message: 'Licença ativada com sucesso!' });
    }

    if (license.hwid === hwid) {
        return res.json({ success: true, message: 'Licença válida.' });
    } else {
        return res.json({ success: false, message: 'Esta licença já está sendo usada em outro computador.' });
    }
});

app.listen(PORT, () => {
    console.log(`License API running on port ${PORT}`);
});
