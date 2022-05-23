const fs = require('fs');
const path = require('path');

const stylesDir = path.join(__dirname, 'styles');
const destFile = path.join(__dirname, 'project-dist', 'bundle.css');

const writeCSS = fs.createWriteStream(destFile);

fs.readdir(stylesDir, {withFileTypes: true}, (err, files) => {
  if (err) {
    console.log(err);
    return;
  }
    
  files.forEach((file) => {
    const ext = path.extname(file.name);
    if (ext !== '.css') {
      return;
    }

    let data = '';

    fs.createReadStream(path.join(stylesDir, file.name))
      .on('data', (chunk) => data += chunk)
      .on('end', () => writeCSS.write(data));
  });
});