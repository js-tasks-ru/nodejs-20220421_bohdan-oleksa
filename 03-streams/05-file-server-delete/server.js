const url = require('url');
const http = require('http');
const path = require('path');
const fs = require('fs');

const removeFile = require('./removeFile');

const server = new http.Server();

server.on('request', (req, res) => {
  const url = new URL(req.url, `http://${req.headers.host}`);
  const pathname = url.pathname.slice(1);

  if (pathname.includes('/') || pathname.includes('..')) {
    res.statusCode = 400;
    res.end('Nested paths are not allowed');
    return;
  }

  const filepath = path.join(__dirname, 'files', pathname);

  switch (req.method) {
    case 'DELETE':
<<<<<<< HEAD
      if (pathname.includes('/') || pathname.includes('..')) {
        res.statusCode = 400;
        res.end('Error 400\nWrong path');
      }
=======
      if (!filepath) {
        res.statusCode = 404;
        res.end('File not found');
        return;
      }

      removeFile(filepath, res);
>>>>>>> 008e01563503aea7568663b3140087544378d164

      fs.unlink(filepath, (err) => {
        if (err) {
          if (err.code === 'ENOENT') {
            res.statusCode = 404;
            res.end('Error 404\nFile not found');
          } else {
            res.statusCode = 500;
            res.end('Internal error');
          }
        } else {
          res.statusCode = 200;
          res.end('File deleted!');
        }
      });
      break;

    default:
      res.statusCode = 501;
      res.end('Not implemented');
  }
});

module.exports = server;
