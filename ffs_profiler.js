BigIntegerGenerator = require("./big_integer_generator")
BigPrimeGenerator = require("./big_prime_generator")
Ffs = require("./ffs")

class FfsProfiler {
  constructor() {

  }

  test() {
    let seedBytesArray, pqBytes, siBytes, k;
    [seedBytesArray, pqBytes, siBytes, k] = [[23, 32, 222, 121], 128, 4, 4];
    let ffs = new Ffs(seedBytesArray, pqBytes, siBytes, k);

    let n, S, V;
    [n, S, V] = ffs.setup();

    let sign, r, x;
    [sign, r, x] = ffs.initProof(n);
    let A = ffs.chooseA();
    let y = ffs.computeY(r, S, A, n);
    let isCorrect = ffs.checkY(y, n, x, A, V);


    let printall = (n, a, p) => {
      let s = ""
      a.map((x) => s += " " + x)
      p(n + " " +s)
    }
    let printbig = (b) => console.log(b.toString());

    printall("S", S, printbig)
    printall("V", V, printbig)
    console.log("n", n.toString())
    console.log("sign", sign.toString())
    console.log("r", r.toString())
    console.log("x", x.toString())
    printall("A", A, console.log)
    console.log("y", y.toString())
    console.log(isCorrect)
  }

  makeManyPrimes() {
    let primeGenerator = new BigPrimeGenerator([23, 35, 63, 12], 128);
    for (var i = 20; i >= 0; i--) {
      console.log(primeGenerator.nextBlum().toString());
      console.log("");
    }
  }
}

module.exports = FfsProfiler
