const BigPrimeGenerator = require("./big_prime_generator");
const BigIntegerGenerator = require("./big_integer_generator");
const jsbn = require("./jsbn");

const crypto = require("crypto");

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
    let r = this.siGenerator.next();
    let x = r.modPowInt(two, n).multiply(sign)

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
    let leftHand = y.modPowInt(two, n);
    let rightHand = x;
    A.forEach((a, i) => {
      if(a != 0) {
        rightHand = rightHand.multiply(V[i]).mod(n);
      }
    })
    console.log(leftHand.toString(), rightHand.toString(), x.toString())
    return leftHand.equals(rightHand);
  }

  // private
  chooseN() {
    let p, q, n;
    [p, q, n] = this.primes.nextBlum();
    return n;
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
