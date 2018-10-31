const BigPrimeGenerator = require("./big_prime_generator")
const BigIntegerGenerator = require("./big_integer_generator")

class Ffs {
  constructor(seedBytesArray, pqBytes, siBytes, k) {
    if(length(seedBytesArray) < 2) throw "Must have at least 2 seed bytes";
    this.k = k;
    let arrayMiddle = Math.floor(seedBytesArray.length/2);
    let pqSeed = seedBytesArray.slice(0, arrayMiddle);
    let siSeed = seedBytesArray.slice(arrayMiddle);
    this.siGenerator = new BigIntegerGenerator(siSeed, siBytes);
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
      S.push(this.siGenerator.nextCoprime(this.p, this.q));
    }
    return S;
  }
}


module.exports = Ffs;
