const createCsvWriter = require('csv-writer').createObjectCsvStringifier;

function generateCSV(data) {
  if (data.length === 0) return '';

  // Визначаємо заголовки динамічно, з усіх ключів об'єктів
  const headerKeys = Object.keys(data[0].answers);
  const header = headerKeys.map(key => ({id: key, title: key}));

  const csvWriter = createCsvWriter({
    header,
  });

  // Формуємо масив записів (flatten об'єкти answers)
  const records = data.map(item => item.answers);

  const csvString = csvWriter.getHeaderString() + csvWriter.stringifyRecords(records);
  return csvString;
}

module.exports = generateCSV;