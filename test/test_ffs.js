const Ffs = require("../ffs")
const set = require('mocha-let');
const jsbn = require("../jsbn")
const assert = require('assert');

describe('Ffs', function() {
  // TODO: generate large arrays, sets of FFS
  const seedBytesArray = [61, 32, 222, 121]
  const pqBytes = 128;
  const siBytes = 4;
  const k = 4;

  let ffs = new Ffs(seedBytesArray, pqBytes, siBytes, k);

  set('ffs', function() { return new Ffs(seedBytesArray, pqBytes, siBytes, k)})
  set('ffsParams', function() {
    let n, S, V;
    [n, S, V] = this.ffs.setup();
    return {n: n, S: S, V: V};
  })
  set('n', function() {
    return this.ffsParams.n;
  })
  set('S', function() {
    return this.ffsParams.S;
  })
  set('V', function() {
    return this.ffsParams.V;
  })
  set('proof', function() {
    let sign, r, x;
    [sign, r, x] = this.ffs.initProof(this.n);
    return {sign: sign, r: r, x: x};
  });
  set('sign', function() {
    return this.proof.sign;
  })
  set('r', function() {
    return this.proof.r;
  })
  set('x', function() {
    return this.proof.x;
  })
  set('A', function() {
    return this.ffs.chooseA();
  })
  set('y', function() {
    return this.ffs.computeY(this.r, this.S, this.A, this.n);
  })

  describe('#setup()', function() {
    it('n should be positive', function() {
      assert.ok(this.n.compareTo(jsbn.BigInteger.ZERO) > 0);
    })
    it('S and V should be same sized arrays', function() {
      assert.strictEqual(this.S.length, this.V.length);
    })
    it('all S and V should be less than n', function() {
      let allLess = true;
      for(let i = this.V.length - 1; i >= 0; i--) {
        allLess = allLess && (this.V[i].compareTo(this.n) < 0);
        allLess = allLess && (this.S[i].compareTo(this.n) < 0);
      }
      assert.ok(allLess);
    })
  });

  describe('#initProof()', function() {
    it('sign should be 1 or -1', function() {
      assert.ok(this.sign.abs().equals(jsbn.BigInteger.ONE));
    })
    it('x should be less than n', function() {
      assert.ok(this.x.compareTo(this.n) < 0);
    })
    it('x should not be 0', function() {
      assert.ok(!this.x.equals(jsbn.BigInteger.ZERO));
    })
    // TODO: out of N runs, some are -1 and some are +1
  });

  describe('#chooseA()', function() {
    it('returns a value for each S', function() {
      assert.strictEqual(this.A.length, this.S.length);
    })
    it('has values in {0, 1}', function() {
      let allOnes = true;
      for(let i = this.A.length - 1; i >= 0; i--) {
        allOnes = allOnes && (this.A[i] === 0 || this.A[i] === 1);
      }
      assert.ok(allOnes);
    })
    // TODO: maybe require at least 1 non-zero value? Why is that still secure?
    // Seems that becomes the inverse modular square root problem for r/x - verify.
  });

  describe('#computeY()', function() {
    it('y is less than n', function() {
      assert.ok(this.y.compareTo(this.n) < 0);
    })
  });

  describe('#checkY()', function() {
    it('verification should succeed when proof is correct', function() {
      assert.ok(this.ffs.checkY(this.y, this.n, this.x, this.A, this.V))
    });

    it('verification should fail when proof is incorrect', function() {
      y = this.y.subtract(jsbn.BigInteger.ONE);
      assert.equal(this.ffs.checkY(y, this.n, this.x, this.A, this.V), false);
    })

    it('verification should fail when x == 0', function() {
      let r, x;
      x = r = jsbn.BigInteger.ZERO;
      let y = this.ffs.computeY(r, this.S, this.A, this.n);
      assert.equal(this.ffs.checkY(y, this.n, x, this.A, this.V), false);
    })

  });

});













