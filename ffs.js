const BigPrimeGenerator = require("./big_prime_generator")
const BigIntegerGenerator = require("./big_integer_generator")

class Ffs {
  constructor(seedBytesArray, pqBytes, siBytes, k) {
    this.k = k;
    let pqSeed = seedBytesArray;
    let siSeed = seedBytesArray;
    this.siGenerator = new BigIntegerGenerator(siSeed, siBytes)
    this.primes = new BigPrimeGenerator(new BigIntegerGenerator(pqSeed, pqBytes));
  }

  chooseN() {
    [this.p, this.q, this.n] = this.primes.nextBlum();
    return this.n;
  }

  chooseS() {
    if (this.n == undefined) throw "Choose N first";
    let S = [];
    while(S.length < this.k) {
      S.push(this.siGenerator.nextCoprime(this.p, this.q))
    }
    return S;
  }
}


module.exports = Ffs;
