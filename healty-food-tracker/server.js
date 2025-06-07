// server.js
const { createServer } = require('https');
const { parse } = require('url');
const next = require('next');
const fs = require('fs');
const path = require('path');

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

// Absolute paths to your certificates
const keyPath = path.resolve(__dirname, 'openssl-docker/server.key');
const certPath = path.resolve(__dirname, 'openssl-docker/server.cert');

app.prepare().then(() => {
  createServer(
    {
      key: fs.readFileSync(keyPath),
      cert: fs.readFileSync(certPath),
    },
    (req, res) => {
      const parsedUrl = parse(req.url, true);
      handle(req, res, parsedUrl);
    }
  ).listen(1234, (err) => {
    if (err) throw err;
    console.log('> Server running on https://localhost:1234');
  });
});
