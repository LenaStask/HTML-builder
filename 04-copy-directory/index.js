const fs = require('fs');
const path = require('path');
const dir = path.join(__dirname, 'files');
const copyDir = path.join(__dirname, 'files-copy');
fs.promises.rm(copyDir, {recursive: true, force: true})
  .then(() => {
    fs.promises.mkdir(copyDir, {recursive: true})
      .then (() => copy())
      .catch ((err) => console.log(err));
  })
  .catch ((err) => console.log(err));
function copy() {
  fs.readdir(dir, (err, files) => {
    if (err) {
      console.log(err);
    } else {
      files.forEach((file) => {
        const copyFile = path.join(copyDir, file); 
        fs.copyFile(path.join(dir, file), copyFile, (err) => {
          if(err) {
            console.log(err);
          }
        });         
      });
    }
  });
}

