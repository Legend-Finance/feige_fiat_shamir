BigIntegerGenerator = require("./big_integer_generator")
BigPrimeGenerator = require("./big_prime_generator")

class FfsProfiler {
  constructor() {

  }

  test() {
    let primeGenerator = new BigPrimeGenerator([23, 35, 63, 12], 128)
    for (var i = 20; i >= 0; i--) {
      console.log(primeGenerator.nextBlum().toString())
      console.log("")
    }
  }
}

module.exports = FfsProfiler
