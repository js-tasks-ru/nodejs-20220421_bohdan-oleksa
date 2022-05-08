const url = require('url');
const http = require('http');
const path = require('path');
const fs = require('fs');
const LimitSizeStream = require('./LimitSizeStream');

const server = new http.Server();

server.on('request', (req, res) => {
  const url = new URL(req.url, `http://${req.headers.host}`);
  const pathname = url.pathname.slice(1);

  const filepath = path.join(__dirname, 'files', pathname);

  const limit = new LimitSizeStream({ limit: 1000000 });

  const writeFile = fs.createWriteStream(filepath);

  switch (req.method) {
    case 'POST':
      if (pathname.includes('/')) {
        res.statusCode = 400;
        res.end('Error 400\nWrong path');
      }

      if (fs.existsSync(filepath)) {
        res.statusCode = 409;
        res.end('File is exist!');
      }

      req.pipe(limit).pipe(writeFile);
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

      writeFile.on('finish', () => res.end());
      break;

    default:
      res.statusCode = 501;
      res.end('Not implemented');
  }
});

module.exports = server;