const BigPrimeGenerator = require("./big_prime_generator");
const BigIntegerGenerator = require("./big_integer_generator");
const jsbn = require("./jsbn");

const crypto = require("crypto");

const negOne = jsbn.BigInteger.ONE.negate()
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
    let n = this.chooseN();
    let S = this.chooseS(n);
    let V = this.computeV(S, n);
    return [n, S, V]
  }

  // Proof
  initProof(n) {
    // TODO: use a RNG instead
    let sign = this.siGenerator.randomSign();
    // TODO: ensure r is not 0
    let r = this.siGenerator.next();
    let x = r.modPowInt(two, n).multiply(sign).mod(n);

    return [sign, r, x]
  }

  chooseA() {
    // TODO: do we need to make sure there is a minimum amount of non-zero values?
    return crypto.randomBytes(this.k).map(a => a % 2)
  }

  computeY(r, S, A, n) {
    // TODO: sexy select statement from S where A[i]!=0
    let y  = r;
    A.forEach((a, i) => {
      if(a != 0) {
        y = y.multiply(S[i]).mod(n);
      }
    });

    return y;
  }

  checkY(y, n, x, A, V) {
    if(x.equals(jsbn.BigInteger.ZERO)) return false;

    let leftSide = y.modPowInt(two, n);
    let product = jsbn.BigInteger.ONE;
    A.forEach((a, i) => {
      if(a != 0) {
        product = product.multiply(V[i]).mod(n);
      }
    })
    let rightSide1 = x.negate().multiply(product).mod(n)
    let rightSide2 = x.multiply(product).mod(n)
    return leftSide.equals(rightSide1) || leftSide.equals(rightSide2)
  }

  // private
  chooseN() {
    let p, q, n;
    [p, q, n] = this.primes.nextBlum();
    return n.abs();
  }

  chooseS(n) {
    let S = [];
    while(S.length < this.k) {
      S.push(this.siGenerator.nextCoprime(n));
    }
    return S;
  }

  computeV(S, n) {
    return S.map(si => si.modPowInt(two, n));
  }

}


module.exports = Ffs;
