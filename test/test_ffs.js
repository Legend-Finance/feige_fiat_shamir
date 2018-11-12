console.log("hello world")
const Ffs = require("../ffs")
const set = require('mocha-let');

var assert = require('assert');
describe('Ffs', function() {
  // let seedBytesArray, pqBytes, siBytes, k;
  // [seedBytesArray, pqBytes, siBytes, k] = [[23, 35, 63, 12], 128, 4, 4];


  const seedBytesArray = [61, 32, 222, 121]
  const pqBytes = 128;
  const siBytes = 4;
  const k = 4;

  let ffs = new Ffs(seedBytesArray, pqBytes, siBytes, k);

  set('ffs', function() { return new Ffs(seedBytesArray, pqBytes, siBytes, k)})

  describe('#checkY()', function() {

    it('verification should succeed when proof is correct', function() {
      let n, S, V;
      [n, S, V] = this.ffs.setup();
      let sign, r, x;
      [sign, r, x] = this.ffs.initProof(n);
      let A = this.ffs.chooseA();
      let y = this.ffs.computeY(r, S, A, n);
      assert.equal(this.ffs.checkY(y, n, x, A, V), true)
    });

  });

});













