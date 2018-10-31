BigIntegerGenerator = require("./big_integer_generator")
BigPrimeGenerator = require("./big_prime_generator")
Ffs = require("./ffs")

class FfsProfiler {
  constructor() {

  }

  test() {
    let seedBytesArray, nBytes, k;
    [seedBytesArray, nBytes, k] = [[23, 35, 63, 12], 128, 4]
    let ffs = new Ffs(seedBytesArray, nBytes, k);
    ffs.chooseN();
  }

  makeManyPrimes() {
    let primeGenerator = new BigPrimeGenerator([23, 35, 63, 12], 128)
    for (var i = 20; i >= 0; i--) {
      console.log(primeGenerator.nextBlum().toString())
      console.log("")
    }
  }
}

module.exports = FfsProfiler
