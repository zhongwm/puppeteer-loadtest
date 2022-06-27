const csvParser = require('csv-parser');
const fs = require('fs');

function loadCsv(filename) {
  const results = [];
  fs.createReadStream('loginusers.csv')
    .pipe(csvParser())
    .on('data', data => results.push(data))
    .on('end', () => {
      console.log(results)
    })
  return results
}
module.exports = loadCsv
