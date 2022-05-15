const stream = require('stream');
const os = require('os');

class LineSplitStream extends stream.Transform {
  constructor(options) {
    super(options);

    this.remainder = '';
  }

  _transform(chunk, encoding, callback) {
    const str = this.remainder + chunk.toString();

    let line = '';
    for (const character of str.split('')) {
      if (character === os.EOL) {
        this.push(line);
        line = '';
        continue;
      }

      line += character;
    }
    this.remainder = line;

    callback();
  }

  _flush(callback) {
    if (this.remainder) {
      this.push(this.remainder);
    }

    callback();
  }
}

// Вставлен код

const lines = new LineSplitStream({
  encoding: 'utf-8',
});

function onData(line) {
  console.log(line);
}

lines.on('data', onData);

lines.write(`первая строка${os.EOL}вторая строка${os.EOL}третья строка`);

lines.end();

module.exports = LineSplitStream;
