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

  setup() {
    this.chooseN();
    this.chooseS();
    this.computeV();
  }

  // Proof
  initProof() {
    let sign = this.siGenerator.randomSign();
    let r = this.siGenerator.next();
    let x = r.modPowInt(two, r).multiply(sign)
    return [sign, r, x]
  }

  chooseA() {
    let result =  new Uint8Array(this.k);
    crypto.getRandomValues(result);
    // TODO: do we need to make sure there is a minimum amount of non-zero values?
    return result.map(a => a % 2)
  }

  computeY(r, S, A) {
    // TODO: sexy select statement from S where A[i]!=0
    for(let s in S) {

    }
  }

  // private
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
