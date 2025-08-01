const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

const apiRoutes = require('./routes');
const adminRoutes = require('./adminRoutes');

const app = express();
const PORT = 3000;

app.use(bodyParser.json());

// Віддаємо фронтенд
app.use('/', express.static(path.join(__dirname, '../frontend')));

// API маршрути
app.use('/api', apiRoutes);

// Адмін маршрути
app.use('/admin', adminRoutes);

app.listen(PORT, () => {
  console.log(`Server started at http://localhost:${PORT}`);
});