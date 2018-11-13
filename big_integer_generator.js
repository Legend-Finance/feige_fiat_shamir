const jsbn = require("./jsbn")

const two = new jsbn.BigInteger([2]);

class BigIntegerGenerator {
  constructor(seedByteArray, nBytes) {
    this.nBytes = nBytes;
    this.prng = new jsbn.Arcfour();
    this.prng.init(seedByteArray);
  }

  next() {
    return new jsbn.BigInteger(this.nextAsBytes());
  }

  nextAsBytes() {
    let x = new Array(this.nBytes);
    for (var i = x.length - 1; i >= 0; i--) {
      x[i] = this.prng.next();
    }
    return x;
  }

  randomSign() {
    // TODO: more efficient sign generation
    return new jsbn.BigInteger([this.next().signum()]);
  }

  nextCoprime(n) {
    let result = null;
    do {
      result = this.next();
    } while(result.mod(n) == 0);
    return result;
  }
}

module.exports = BigIntegerGenerator
