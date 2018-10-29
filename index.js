const jsbn = require("./jsbn")


function generateRandomBigint(seedByteArray, nBytes) {
  let x = new Array(nBytes)
  let prng = new jsbn.Arcfour()
  prng.init(seedByteArray)
  for (var i = x.length - 1; i >= 0; i--) {
    x[i] = prng.next()
  }
  return new jsbn.BigInteger(x)
}


randomInt = generateRandomBigint([23, 35, 63, 12], 128)
console.log(randomInt.toString())
