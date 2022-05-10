const stream = require('stream')
const os = require('os')

class LineSplitStream extends stream.Transform {
  constructor(options) {
<<<<<<< HEAD
    super(options)
    this.remainder = ''
  }

  _transform(chunk, encoding, callback) {
    const str = this.remainder + chunk.toString()
    // console.log(str);

    let line = ''
    for (const char of str.split('')) {
      if (char === os.EOL) {
        this.push(line)
        line = ''
        continue
      }

      line += char
    }
    this.remainder = line

    callback()
=======
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
>>>>>>> ef15ef1c5fd907928481b260d7d2ceed5e146de7
  }

  _flush(callback) {
    if (this.remainder) {
<<<<<<< HEAD
      this.push(this.remainder)
    }
    callback()
=======
      this.push(this.remainder);
    }

    callback();
>>>>>>> ef15ef1c5fd907928481b260d7d2ceed5e146de7
  }
}

// Вставлен код

const lines = new LineSplitStream({
  encoding: 'utf-8',
})

function onData(line) {
  console.log(line)
}

lines.on('data', onData)

lines.write(`первая строка${os.EOL}вторая строка${os.EOL}третья строка`)

lines.end()

module.exports = LineSplitStream
