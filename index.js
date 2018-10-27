const jsbn = require("jsbn")


function generateRandomBigint(nBytes) {
  let x = new Array(nBytes)
  let rng = new jsbn.SecureRandom()
  rng.nextBytes(x)

  return new jsbn.BigInteger(x)
}


randomInt = generateRandomBigint(128)
console.log(randomInt.toString())
