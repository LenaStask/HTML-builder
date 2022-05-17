const fs = require('fs');
const stream = fs.createReadStream('./01-read-file/text.txt');
let data = '';
stream.on('data', chunk => data +=chunk);
stream.on('end', () => console.log(data));
stream.on('error', error => console.log('Error', error.message));