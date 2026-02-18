const mysql = require('mysql2/promise');

const pool = mysql.createPool({
    host: '127.0.0.1',
    user: 'root',
    password: '',
    database: 'erettsewgi',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

//!SQL Queries
async function selectall() {
    const query = 'SELECT * FROM exampletable;';
    const [rows] = await pool.execute(query);
    return rows;
}
async function ujdiak(id, diaknev, evfolyam, osztaly) {
    const query = `
        INSERT INTO vizsgazo (id, diaknev, evfolyam, osztaly)
        VALUES (?, ?, ?, ?)
    `;
    
    const [result] = await pool.execute(query, [id, diaknev, evfolyam, osztaly]);
    return result;
}async function select12DbyOrder() {
    const query = `
        SELECT diaknev, evfolyam, osztaly
        FROM vizsgazo
        WHERE evfolyam = 12 AND osztaly = 'D'
        ORDER BY diaknev ASC
    `;
    const [rows] = await pool.execute(query);
    return rows;
}
async function select12Letszamok() {
    const query = `
        SELECT osztaly, COUNT(*) AS letszam
        FROM vizsgazo
        WHERE evfolyam = 12
        GROUP BY osztaly
    `;
    const [rows] = await pool.execute(query);
    return rows;
}
async function selectAngoltanar() {
    const query = `
        SELECT t.nev AS tanarnev
        FROM tanar t
        JOIN vizsgak v ON t.id = v.tanarid
        WHERE v.vizsgatargy = 'angol nyelv'
        GROUP BY t.nev
    `;
    const [rows] = await pool.execute(query);
    return rows;
}
async function selectFelelos() {
    const query = `
        SELECT v.diaknev AS nev, count(vizsgak.id) AS vizsgak_szama
        FROM vizsgazo v
        JOIN vizsgak ON v.id = vizsgak.vizsgazoid
        GROUP BY v.diaknev
    `;
    const [rows] = await pool.execute(query);
    return rows;
}
    
//!Export
module.exports = {
    selectall,
    ujdiak,
    select12DbyOrder,
    select12Letszamok,
    selectAngoltanar,
    selectFelelos
};
