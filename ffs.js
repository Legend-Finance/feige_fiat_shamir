const BigPrimeGenerator = require("./big_prime_generator")
const BigIntegerGenerator = require("./big_integer_generator")

class Ffs {
  constructor(seedBytesArray, nBytes, k) {
    this.nBytes = nBytes;
    this.k = k;
    this.ints = new BigIntegerGenerator(seedBytesArray, nBytes);
    this.primes = new BigPrimeGenerator(this.ints);
  }

  chooseN() {
    [this.p, this.q, this.n] = this.primes.nextBlum();
    return this.n;
  }

  chooseS() {
    throw "Choose N first" if (this.n == undefined);
    let S = [];
    while(len(S) < this.k) {

    }
  }

  // private
  chooseNextSi() {

  }
}


module.exports = Ffs;
