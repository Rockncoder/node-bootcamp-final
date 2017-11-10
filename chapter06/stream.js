const http = require('http');
const fs = require('fs');
const warAndPeace = '../assets/war-and-peace.txt';
const PORT = 8080;

// http.createServer((req, res) => {
//   const rs = fs.createReadStream(warAndPeace);
//   rs.on('data', data => {
//     const buffering = res.write(data);
//     console.info(`was buffer flushed: ${buffering}`);
//   });
//   rs.on('end', () => {
//     res.end();
//     console.info('complete!');
//   });
//
//   rs.on('finish', () => {
//     console.info('finish!');
//   });
//
// }).listen(PORT);
//
//
// http.createServer((req, res) => {
//   const rs = fs.createReadStream(warAndPeace);
//   rs.pipe(res);
// }).listen(PORT);

http.createServer((req, res) => {
  const rs = fs.createReadStream(warAndPeace);
  rs.pipe(res, {end: false});
  rs.on('end', () => {
    res.end();
    console.info('The pipe is closed');
  });
}).listen(PORT);
