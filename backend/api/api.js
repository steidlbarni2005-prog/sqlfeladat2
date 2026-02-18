const express = require('express');
const router = express.Router();
const database = require('../sql/database.js');
const fs = require('fs/promises');

//!Multer
const multer = require('multer'); //?npm install multer
const path = require('path');

const storage = multer.diskStorage({
    destination: (request, file, callback) => {
        callback(null, path.join(__dirname, '../uploads'));
    },
    filename: (request, file, callback) => {
        callback(null, Date.now() + '-' + file.originalname); //?egyedi név: dátum - file eredeti neve
    }
});

const upload = multer({ storage });

//!Endpoints:
//?GET /api/test
router.get('/test', (request, response) => {
    response.status(200).json({
        message: 'Ez a végpont működik.'
    });
});

//?GET /api/testsql
router.get('/testsql', async (request, response) => {
    try {
        const selectall = await database.selectall();
        response.status(200).json({
            message: 'Ez a végpont működik.',
            results: selectall
        });
    } catch (error) {
        response.status(500).json({
            message: 'Ez a végpont nem működik.'
        });
    }
});
router.post('/ujdiak', async (request, response) => {
    try {
        const { id, diaknev, evfolyam, osztaly } = request.body;
        console.log(request.body);


        // Egyszerű validáció
        if (!id || !diaknev || !evfolyam || !osztaly) {
            return response.status(400).json({
                message: 'Hiányzó adatok.'
            });
        }

        await database.ujdiak(id, diaknev, evfolyam, osztaly);

        response.status(201).json({
            message: 'Sikeres adatbevitel.'
        });

    } catch (error) {
        console.error(error);

        response.status(500).json({
            message: 'Sikertelen adatbevitel.'
        });
    }
});
router.get('/nevsor', async (request, response) => {
    try {
        const results = await database.select12DbyOrder();
        response.status(200).json({
            message: 'Sikeres lekérdezés.',
            results: results
        });
    } catch (error) {
        console.error(error);
        response.status(500).json({
            message: 'Sikertelen lekérdezés.'
        });
    }
});
router.get('/letszamok', async (request, response) => {
    try {
        const results = await database.select12Letszamok();
        response.status(200).json({
            message: 'Sikeres lekérdezés.',
            results: results
        });
    } catch (error) {
        console.error(error);
        response.status(500).json({
            message: 'Sikertelen lekérdezés.'
        });
    }
});
router.get('/angol', async (request, response) => {
    try {
        const results = await database.selectAngoltanar();
        console.log(results);
        response.status(200).json({
            message: 'Sikeres lekérdezés.',
            results: results
        });
    } catch (error) {
        console.error(error);
        response.status(500).json({
            message: 'Sikertelen lekérdezés.'
        });
    }
});
router.get('/felelos', async (request, response) => {
    try {
        console.log('Felelősök lekérdezése...');
        const results = await database.selectFelelos();
        console.log(results);
        response.status(200).json({
            message: 'Sikeres lekérdezés.',
            results: results
        });
    } catch (error) {
        console.error(error);
        response.status(500).json({
            message: 'Sikertelen lekérdezés.'
        });
    }
    
});
module.exports = router;
