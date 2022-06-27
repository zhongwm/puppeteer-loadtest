const csvSyncParser = require('csv-parse/sync');
const fs = require('fs');

function loadCsv(filename) {
    let csvf = fs.readFileSync(filename);
    return csvSyncParser.parse(csvf, {
      columns: true,
      skip_empty_lines: true
    });
}

module.exports = loadCsv;
