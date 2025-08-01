const express = require('express');
const router = express.Router();

const { answers } = require('./dataStore');
const generateCSV = require('./csvExport');

// Прийом відповіді (POST)
router.post('/answers', (req, res) => {
  const data = req.body;

  if (!data || !data.answers) {
    return res.status(400).json({ error: 'Invalid data' });
  }

  answers.push({
    timestamp: new Date().toISOString(),
    answers: data.answers,
  });

  res.json({ success: true });
});

// Отримання всіх відповідей (GET)
router.get('/answers', (req, res) => {
  res.json(answers);
});

// Експорт CSV (GET)
router.get('/export-csv', (req, res) => {
  const csv = generateCSV(answers);

  res.setHeader('Content-Disposition', 'attachment; filename=answers.csv');
  res.setHeader('Content-Type', 'text/csv;charset=utf-8');
  res.send(csv);
});

module.exports = router;