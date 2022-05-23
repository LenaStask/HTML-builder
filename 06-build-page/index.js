const fs = require('fs');
const path = require('path');

const assetsDir = path.join(__dirname, 'assets');
const componentsDir = path.join(__dirname, 'components');
const stylesDir = path.join(__dirname, 'styles');
const projectDistDir = path.join(__dirname, 'project-dist');
const projectDistAssetsDir = path.join(projectDistDir, 'assets');

async function readFile(filePath) {
  return await fs.promises.readFile(filePath, {encoding: 'utf8'});
}

async function createIndexPage() {
  let html = await readFile(path.join(__dirname, 'template.html'));

  const header = await readFile(path.join(componentsDir, 'header.html'));
  const articles = await readFile(path.join(componentsDir, 'articles.html'));
  const footer = await readFile(path.join(componentsDir, 'footer.html'));

  html = html.replace('{{header}}', header);
  html = html.replace('{{articles}}', articles);
  html = html.replace('{{footer}}', footer);

  await fs.promises.writeFile(path.join(projectDistDir, 'index.html'), html);
}

function createStyleFile() {
  const writeCSS = fs.createWriteStream(path.join(projectDistDir, 'style.css'));

  fs.readdir(stylesDir, (err, files) => {
    if (err) {
      console.log(err);
      return;
    }
    
    files.forEach((file) => {
      let data = '';

      fs.createReadStream(path.join(stylesDir, file))
        .on('data', (chunk) => data += chunk)
        .on('end', () => writeCSS.write(data));
    });
  });
}

function copyAssets(srcDir, destDir) {
  fs.readdir(srcDir, (err, files) => {
    if(err) {
      console.log(err);
      return;
    }
    
    files.forEach((file) => { 
      const destFile = path.join(destDir, file);
      fs.stat(path.join(srcDir, file), (_error, stats) => {
        if(stats.isDirectory()) {
          fs.promises.mkdir(destFile, {recursive: true})
            .then(() => copyAssets(path.join(srcDir, file), destFile))
            .catch((err) => console.log(err));
        } else {
          fs.copyFile(path.join(srcDir, file), destFile, (err) => {
            if (err) {
              console.log(err);
            }
          });
        }
      });
    });
  });
}

async function main() {
  await fs.promises.mkdir(projectDistDir, {recursive: true});

  createIndexPage();
  createStyleFile();

  await fs.promises.mkdir(projectDistAssetsDir, {recursive: true});

  copyAssets(assetsDir, projectDistAssetsDir);
}

main();