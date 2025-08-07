import test from 'node:test';
import {
  add,
  angle,
  angleTo,
  angleWith,
  angleWithSep,
  dist,
  div,
  divByPoint,
  equals,
  from,
  mag,
  matMult,
  mult,
  multByPoint,
  perp,
  rotate,
  rotateAround,
  round,
  sub,
  unit
} from '../lib/point-geometry.js';

test('mag', t => {
  t.assert.equal(mag(from(0, 2)), 2);
  t.assert.equal(mag(from(0, 0)), 0);
  t.assert.equal(mag(from(10, 0)), 10);
});

test('unit', t => {
  t.assert.deepEqual(unit(from(0, 1000)), from(0, 1));
});

test('equals', t => {
  t.assert.equal(equals(from(0, 0), from(0, 0)), true, 'equal');
  t.assert.equal(equals(from(0, 0), from(0, 10)), false, 'not equal');
});

test('dist', t => {
  t.assert.equal(dist(from(0, 10), from(0, 0)), 10);
  t.assert.equal(dist(from(Math.sqrt(2), Math.sqrt(2)), from(0, 0)), 2);
  t.assert.equal(dist(from(0, 0), from(0, 0)), 0);
});

test('mult', t => {
  t.assert.deepEqual(mult(from(0, 0), 5), from(0, 0));
  t.assert.deepEqual(mult(from(0, 1), 5), from(0, 5));
  t.assert.deepEqual(mult(from(1, 1), 5), from(5, 5));
});

test('div', t => {
  t.assert.deepEqual(div(from(0, 0), 5), from(0, 0));
  t.assert.deepEqual(div(from(0, 1), 5), from(0, 1 / 5));
  t.assert.deepEqual(div(from(1, 1), 5), from(1 / 5, 1 / 5));
});

test('multByPoint', t => {
  t.assert.deepEqual(multByPoint(from(0, 0), from(5, 5)), from(0, 0));
  t.assert.deepEqual(multByPoint(from(0, 1), from(5, 5)), from(0, 5));
  t.assert.deepEqual(multByPoint(from(1, 1), from(4, 5)), from(4, 5));
});

test('divByPoint', t => {
  t.assert.deepEqual(divByPoint(from(0, 0), from(5, 5)), from(0, 0));
  t.assert.deepEqual(divByPoint(from(0, 1), from(5, 5)), from(0, 1 / 5));
  t.assert.deepEqual(divByPoint(from(1, 1), from(4, 5)), from(1 / 4, 1 / 5));
});

test('rotate', t => {
  t.assert.deepEqual(rotate(from(0, 0), 0), from(0, 0));
  t.assert.deepEqual(round(rotate(from(0, 1), Math.PI / 2)), from(-1, 0));
  t.assert.deepEqual(round(rotate(from(0, 1), Math.PI)), from(-0, -1));
});

test('rotateAround', t => {
  t.assert.deepEqual(round(rotateAround(from(2, 3), Math.PI / 2, from(2, 2))), from(1, 2));
  t.assert.deepEqual(round(rotateAround(from(2, 3), Math.PI, from(2, 2))), from(2, 1));
});

test('round', t => {
  t.assert.deepEqual(round(from(0, 0)), from(0, 0));
  t.assert.deepEqual(round(from(0, 0.5)), from(0, 1));
  t.assert.deepEqual(round(from(0.2, 0.2)), from(0, 0));
});

test('angle', t => {
  t.assert.equal(angle(from(0, 0)), 0);
  t.assert.equal(angle(from(10, 10)), Math.PI / 4);
  t.assert.equal(angle(from(0, 10)), Math.PI / 2);
  t.assert.equal(angle(from(10, 0)), 0);
});

test('angleTo', t => {
  const b = from(0, 0);
  t.assert.equal(angleTo(from(0, 0), b), 0);
  t.assert.equal(angleTo(from(10, 10), b), Math.PI / 4);
  t.assert.equal(angleTo(from(0, 10), b), Math.PI / 2);
  t.assert.equal(angleTo(from(10, 0), b), 0);
});

test('angleWith', t => {
  const b = from(0, 0);
  t.assert.equal(angleWith(from(0, 0), b), 0);
  t.assert.equal(angleWith(from(10, 10), b), 0);
  t.assert.equal(angleWith(from(0, 10), b), 0);
  t.assert.equal(angleWith(from(10, 0), b), 0);
});

test('angleWithSep', t => {
  t.assert.equal(angleWithSep(from(0, 0), 0, 0), 0);
  t.assert.equal(angleWithSep(from(10, 10), 0, 0), 0);
  t.assert.equal(angleWithSep(from(0, 10), 0, 0), 0);
  t.assert.equal(angleWithSep(from(10, 0), 0, 0), 0);
});

test('matMult', t => {
  t.assert.deepEqual(matMult(from(0, 0), [0, 0, 0, 0]), from(0, 0));
  t.assert.deepEqual(matMult(from(1, 1), [0, 0, 0, 0]), from(0, 0));
  t.assert.deepEqual(matMult(from(1, 1), [1, 0, 1, 0]), from(1, 1));
  t.assert.deepEqual(matMult(from(1, 1), [1, 0, 0, 0]), from(1, 0));
  t.assert.deepEqual(matMult(from(1, 1), [0, 0, 1, 0]), from(0, 1));
  t.assert.deepEqual(matMult(from(1, 1), [0, 0, 1, 2]), from(0, 3));
  t.assert.deepEqual(matMult(from(1, 1), [1, 1, 1, 1]), from(2, 2));
});

test('perp', t => {
  t.assert.deepEqual(perp(from(0, 1000)), from(-1000, 0));
});

test('add', t => {
  t.assert.deepEqual(add(from(0, 0), from(10, 10)), from(10, 10));
});

test('sub', t => {
  t.assert.deepEqual(sub(from(0, 0), from(10, 10)), from(-10, -10));
});
