const jsbn = require("./jsbn")

class RandomIntegerGenerator {
  constructor(seedByteArray) {
    this.prng = new jsbn.Arcfour();
    this.prng.init(seedByteArray);
  }
  next(nBytes) {
    let x = new Array(nBytes);
    for (var i = x.length - 1; i >= 0; i--) {
      x[i] = this.prng.next();
    }
    return new jsbn.BigInteger(x);
  }
}

module.exports = RandomIntegerGenerator
