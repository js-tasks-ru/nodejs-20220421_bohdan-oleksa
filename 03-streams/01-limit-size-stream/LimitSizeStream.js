const stream = require('stream');
const LimitExceededError = require('./LimitExceededError');

class LimitSizeStream extends stream.Transform {
  constructor(options) {
    super(options);
<<<<<<< HEAD
    this.limit = options.limit;
    this.chunkCounter = 0;
  }

  _transform(chunk, encoding, callback) {
    this.chunkCounter += Buffer.byteLength(Buffer.from(chunk));
    if (this.chunkCounter > this.limit) {
=======

    this.limit = options.limit;
    this.size = 0;
    this.isObjectMode = !!options.readableObjectMode;
  }

  _transform(chunk, encoding, callback) {
    if (this.isObjectMode) {
      this.size += 1;
    } else {
      this.size += chunk.length;
    }

    if (this.size > this.limit) {
>>>>>>> 3da1d71a52a03a5a3bad3af33eaf0491c8388f88
      callback(new LimitExceededError());
    } else {
      callback(null, chunk);
    }
  }
}

module.exports = LimitSizeStream;
