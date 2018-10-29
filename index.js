const jsbn = require("./jsbn")

class RandomIntegerGenerator {
  constructor(seedByteArray) {
    this.prng = new jsbn.Arcfour();
    this.prng.init(seedByteArray);
  }
  next(nBytes) {
    let x = new Array(nBytes);
    for (var i = x.length - 1; i >= 0; i--) {
      x[i] = this.prng.next();
    }
    return new jsbn.BigInteger(x);
  }
}

class RandomPrimeGenerator {
  constructor(seedByteArray, nBytes) {
    this.rnd = new RandomIntegerGenerator(seedByteArray)
    this.nBytes = nBytes
  }

  next() {
    let result = new jsbn.BigInteger([1]);
    while(!result.isProbablePrime()) {
      result = this.rnd.next(this.nBytes);
    }
    return result;
  }
}

primeGenerator = new RandomPrimeGenerator([23, 35, 63, 12], 128)
for (var i = 20; i >= 0; i--) {
  console.log(primeGenerator.next().toString())
  console.log("")
}
