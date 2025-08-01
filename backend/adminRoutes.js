const express = require('express');
const path = require('path');
const router = express.Router();

const ADMIN_KEY = 'supersecretkey'; // зміни на свій ключ

// Middleware для авторизації адміна через query param
router.use((req, res, next) => {
  if (req.query.key !== ADMIN_KEY) {
    return res.status(401).send('Unauthorized');
  }
  next();
});

// Віддаємо адмінську HTML сторінку
router.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/admin.html'));
});

// Віддаємо JS для адміна
router.get('/admin.js', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/admin.js'));
});

module.exports = router;