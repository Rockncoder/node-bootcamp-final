// path is a core module
const path = require('path');

const billPath = '..//deep/path//test///bill-of-rights.txt';
const fixedBillPath = path.normalize(billPath);

console.info(`billPath =      ${billPath}`);
console.info(`fixedBillPath = ${fixedBillPath}`);

const comboPath = path.join('..', '//deep', '/path//test/frodo','..','/bill-of-rights.txt');
console.info(`comboPath =     ${comboPath}`);

// resolve - combines multiple paths together, doesn't check file systems
// results might not always be what you wanted

const resolved = path.resolve('../deep//path', 'test');
console.info(`resolved =      ${resolved}`);
const resolved2 = path.resolve('deep//path', 'test');
console.info(`resolved2 =     ${resolved2}`);

const bill = '../deep/path/test/bill-of-rights.txt';
console.info(`file name =      ${path.basename(bill)}`);
console.info(`directory name = ${path.dirname(bill)}`);
console.info(`extension name = ${path.extname(bill)}`);
console.info(`file name - ext= ${path.basename(bill, path.extname(bill))}`);

const fs = require('fs');
fs.access(bill, fs.constants.R_OK | fs.constants.W_OK, (err) => {
  console.info(`${bill} ` + (err ? 'no access!' : 'can read/write'));
});