const url = require('url');
const http = require('http');
const path = require('path');
const fs = require('fs');

const server = new http.Server();

server.on('request', (req, res) => {
  const url = new URL(req.url, `http://${req.headers.host}`);
  const pathname = url.pathname.slice(1);

  const filepath = path.join(__dirname, 'files', pathname);

  switch (req.method) {
    case 'DELETE':
      if (pathname.includes('/')) {
        res.statusCode = 400;
        res.end('Error 400\nWrong path');
      } else if (!fs.existsSync(filepath)) {
        res.statusCode = 404;
        res.end('File not found');
      } else {
        fs.unlink(filepath, (err) => {
          if (err) throw err;
          console.log('path/file.txt was deleted');
        });
        res.statusCode = 200;
        res.end('File deleted');
      }

      req.on('error', (err) => {
        res.statusCode = 500;
        res.end('Error 500 ');
      });

      break;

    default:
      res.statusCode = 501;
      res.end('Not implemented');
  }
});

module.exports = server;
