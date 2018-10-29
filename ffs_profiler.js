const RandomIntegerGenerator = require("./random_integer_generator")
const RandomPrimeGenerator = require("./random_prime_generator")


class FfsProfiler {
  constructor() {

  }

  test() {
    let primeGenerator = new RandomPrimeGenerator([23, 35, 63, 12], 128)
    for (var i = 20; i >= 0; i--) {
      console.log(primeGenerator.next().toString())
      console.log("")
    }
  }
}

module.exports = FfsProfiler
