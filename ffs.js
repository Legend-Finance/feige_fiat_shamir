const BigPrimeGenerator = require("./big_prime_generator");
const BigIntegerGenerator = require("./big_integer_generator");
const jsbn = require("./jsbn");

const two = new jsbn.BigInteger([2]);

class Ffs {
  constructor(seedBytesArray, pqBytes, siBytes, k) {
    if (seedBytesArray.length < 2) throw "Must have at least 2 seed bytes";
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
    this.S = S;
    return S;
  }

  computeV() {
    if (this.S == undefined) throw "Choose S first";
    this.V = this.S.map(si => si.modPowInt(two, this.n));
    return this.V;
  }
}


module.exports = Ffs;
