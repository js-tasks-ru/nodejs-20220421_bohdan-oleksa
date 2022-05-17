const url = require('url');
const http = require('http');
const path = require('path');
const fs = require('fs');
const LimitSizeStream = require('./LimitSizeStream');

const receiveFile = require('./receiveFile');

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
    case 'POST':
<<<<<<< HEAD
      const limit = new LimitSizeStream({ limit: 1e6 });
      const writeFile = fs.createWriteStream(filepath, { flags: 'wx' });
=======
      if (!filepath) {
        res.statusCode = 404;
        res.end('File not found');
        return;
      }

      receiveFile(filepath, req, res);
>>>>>>> 008e01563503aea7568663b3140087544378d164

      if (req.headers['content-length'] > 1e6) {
        res.statusCode = 413;
        res.end('File is too big!');
        return;
      }

      req.pipe(limit).pipe(writeFile);

      limit.on('error', (err) => {
        if (err.code === 'LIMIT_EXCEEDED') {
          res.statusCode = 413;
          res.end('File is too big!');
        } else {
          res.statusCode = 500;
          res.end('Error 500');
        }

        fs.unlink(filepath, (err) => {});
      });

      writeFile.on('finish', () => {
        res.statusCode = 201;
        res.end('File created!');
      });

      writeFile.on('error', (err) => {
        if (err.code === 'EEXIST') {
          res.statusCode = 409;
          res.end('File is exist!');
        } else {
          res.statusCode = 500;
          res.end('Internal server error');
          fs.unlink(filepath, (err) => {});
        }
      });

      if (pathname.includes('/') || pathname.includes('..')) {
        res.statusCode = 400;
        res.end('Error 400\nWrong path');
      }

      req.on('error', (err) => {
        if (err.code === 'LIMIT_EXCEEDED') {
          res.statusCode = 413;
          res.end('Limit has been exceeded.');
        }
      });

      req.on('aborted', (err) => {
        fs.unlink(filepath, (err) => {
          if (err) throw err;
        });
        res.end();
      });

      writeFile.on('error', (err) => {
        res.statusCode = 500;
        res.end('Error 500');
      });
      break;

    default:
      res.statusCode = 501;
      res.end('Not implemented');
  }
});

module.exports = server;
