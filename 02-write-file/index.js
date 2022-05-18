const fs = require('fs');
const readline = require('readline');
const path = require('path');
const filePath = path.join(__dirname, 'text.txt');
const output = fs.createWriteStream(filePath);
const rl = readline.createInterface({
  input: process.stdin, 
  output: process.stdout
});

function bye() {
  console.log('BYE BYE');
  rl.close();
}

function ask() {
  rl.question('Welcome! Input your text: ', (answer) => {
    if (answer === 'exit') {
      bye();
      return;
    }
    output.write(answer);
    ask();
  });
}

rl.on('SIGINT', bye);

ask();