const fs = require('fs');
const path = require('path');
const dir = path.join(__dirname, 'secret-folder');

fs.readdir(dir, {withFileTypes: true}, (err, files) => {
  if (err) {
    console.log(err);
    return;
  }
  
  console.log('files names:');
  files.forEach(file => {
    if(file.isFile()) {
      const filePath = path.join(dir, file.name);
      fs.stat(filePath, (_error, stats) => {
        const ext = path.extname(file.name);
        const basename = path.basename(file.name, ext);
        console.log(`${basename} - ${ext.substring(1)} - ${stats.size}`);
      });
    }
  });
});