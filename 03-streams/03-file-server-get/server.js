const url = require('url');
const http = require('http');
const path = require('path');
const fs = require('fs');

const server = new http.Server();

server.on('request', (req, res) => {
  const url = new URL(req.url, `http://${req.headers.host}`);
  const pathname = url.pathname.slice(1);
  const filepath = path.join(__dirname, 'test/fixtures', pathname);
  const readFile = fs.createReadStream(filepath);

  switch (req.method) {
    case 'GET':
      readFile.pipe(res);

      readFile.on('error', (err) => {
        if (err.code === 'ENOENT') {
          res.statusCode = 404;
          res.end('No file found');
        } else {
          res.statusCode = 500;
          res.end('Something went wrong');
        }
      });

      if (pathname.includes('/') || pathname.includes('..')) {
        res.statusCode = 400;
        res.end('Error 400');
      }

      req.on('aborted', () => {
        readFile.destroy();
      });

      break;

    default:
      res.statusCode = 501;
      res.end('Not implemented');
  }
});

module.exports = server;


