const jsbn = require("./jsbn")
const RandomIntegerGeneratorRandom = require("./random_integer_generator")

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

module.exports = RandomPrimeGenerator
