const jsbn = require("./jsbn")

class BigIntegerGenerator {
  constructor(seedByteArray, nBytes) {
    this.nBytes = nBytes;
    this.prng = new jsbn.Arcfour();
    this.prng.init(seedByteArray);
  }

  next() {
    let x = new Array(this.nBytes);
    for (var i = x.length - 1; i >= 0; i--) {
      x[i] = this.prng.next();
    }
    return new jsbn.BigInteger(x);
  }

  nextCoprime(p, q) {
    let result = null;
    do {
      result = this.next();
    } while(result.mod(p) == 0 || result.mod(q) == 0);
    return result;
  }
}

module.exports = BigIntegerGenerator
