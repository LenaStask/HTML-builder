const fs = require('fs');
const path = require('path');
const dir = path.join(__dirname, 'secret-folder');

fs.readdir(dir, {withFileTypes: true}, (err, files) => {
  if (err) {
    console.log(err);
  } else {
    console.log('files names:');
    files.forEach(file => {
      const filePath = path.join(dir, file.name);
      fs.stat(filePath, (error, stats) => {
        const ext = path.extname(file.name);
        const basename = path.basename(file.name, ext);
        console.log(`${basename} - ${ext} - ${stats.size}`);
      });
    });
  }
});