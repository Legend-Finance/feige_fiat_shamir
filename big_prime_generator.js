const jsbn = require("./jsbn")
const BigIntegerGenerator = require("./big_integer_generator")

const three = new jsbn.BigInteger([3])
const four = new jsbn.BigInteger([4])

class BigPrimeGenerator {
  constructor(rnd) {
    this.rnd = rnd;
  }

  next() {
    let result = null;
    do {
      result = this.rnd.next();
    } while(!result.isProbablePrime());
    return result;
  }

  nextBlum() {
    let blum = null;
    let a = null;
    let b = null;
    do {
      a = this.next();
      b = this.next();
      blum = a.multiply(b);
    } while(!this.isBlumPrime(blum));
    return [blum, a, b];
  }

  // Private
  isBlumPrime(bigInteger) {
    let sansRemainder = bigInteger.subtract(four);
    return sansRemainder.mod(three) == 0;
  }
}

module.exports = BigPrimeGenerator
