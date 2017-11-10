const socketio = require('socket.io');
const restify = require('restify');
const server = restify.createServer();
const PORT = 8080;
const fs = require('fs');

// respond = (req, res, next ) => {
//   res.send('hello ' + req.params.name);
//   next();
// };
//
// const helloRoute = '/hello/:name';
// server.get(helloRoute, respond);
// server.head(helloRoute, respond);
// server.listen(PORT, function() {
//   console.log('%s listening at %s', server.name, server.url);
// });
//
// // you are responsible for call next()
// server.post('/foo',
//   (req, res, next) => {
//     req.someData = 'foo';
//     console.info(`In the first handler: ${req.someData}`);
//     return next();
//   },
//   (req, res, next) => {
//     console.info(`In the second handler: ${req.someData}`);
//     res.send(req.someData);
//     return next();
//   }
// );

const io = socketio.listen(server.server);

server.get('/', function indexHTML(req, res, next) {
  fs.readFile(__dirname + '/views/index.html', function (err, data) {
    if (err) {
      next(err);
      return;
    }

    res.setHeader('Content-Type', 'text/html');
    res.writeHead(200);
    res.end(data);
    next();
  });
});


io.sockets.on('connection', function (socket) {
  socket.emit('news', { hello: 'world' });
  socket.on('my other event', function (data) {
    console.log(data);
  });
});

server.listen(8080, function () {
  console.log('socket.io server listening at %s', server.url);
});
