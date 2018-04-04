const fs = require("fs");
const cmudictFile = readCmudictFile("./cmudict.txt");

function readCmudictFile(file) {
  return fs.readFileSync(file).toString();
}

function formatData(data) {
  let wordSybObj = {};
  let lines = data.toString().split("\n");
  let lineSplit;
  lines.forEach(line => {
    let syllable = 0;
    lineSplit = line.split(" ");
    for (let i = 2; i < lineSplit.length; i++) {
      if (lineSplit[i].match(/\d/)) {
        syllable++;
      }
    }
    if (wordSybObj[syllable]) {
      wordSybObj[syllable].push(lineSplit[0]);
    } else {
      wordSybObj[syllable] = [lineSplit[0]];
    }
  });
  return wordSybObj;
}

const objectSyllable = formatData(cmudictFile);

function createHaiku(structure) {
  //[5,7,5]
  let final = "";
  structure.forEach(lines => {
    if (Array.isArray(lines)) {
      lines.forEach(numSyb => {
        let index = Math.floor(
          Math.random() * Math.floor(objectSyllable[numSyb].length)
        );
        final += objectSyllable[numSyb][index] + " ";
      });
    } else {
      let index = Math.floor(
        Math.random() * Math.floor(objectSyllable[lines].length)
      );
      final += objectSyllable[lines][index];
    }
    final += "\n";
  });
  console.log(final);
}

module.exports = {
  createHaiku
};
