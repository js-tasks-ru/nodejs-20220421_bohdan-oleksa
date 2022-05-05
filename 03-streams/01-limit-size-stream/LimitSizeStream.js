const stream = require('stream');
const LimitExceededError = require('./LimitExceededError');

class LimitSizeStream extends stream.Transform {
  constructor(options) {
    super(options);
    this.limit = options.limit;
    this.chunkCounter = 0;
  }

  _transform(chunk, encoding, callback) {
    this.chunkCounter += Buffer.byteLength(Buffer.from(chunk));
    if (this.chunkCounter > this.limit) {
      callback(new LimitExceededError());
    } else {
      callback(null, chunk);
    }
  }
}

module.exports = LimitSizeStream;
