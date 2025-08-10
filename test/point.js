import test from 'node:test';
import { Point } from '../lib/point.js';

test('Point.convert', t => {
  t.assert.equal(Point.convert(new Point(20, 30)).equals(new Point(20, 30)), true);
  t.assert.equal(Point.convert([20, 30]).equals(new Point(20, 30)), true);
  t.assert.equal(Point.convert({ x: 20, y: 30 }).equals(new Point(20, 30)), true);
  t.assert.throws(() => Point.convert('somestring'));
});

test('Point.mag', t => {
  t.assert.equal(new Point(0, 2).mag(), 2);
  t.assert.equal(new Point(0, 0).mag(), 0);
  t.assert.equal(new Point(10, 0).mag(), 10);
});

test('Point.unit', t => {
  const p = new Point(0, 1000);
  t.assert.deepEqual(p.unit(), new Point(0, 1));
  t.assert.deepEqual(p, new Point(0, 1000));
});

test('Point._unit', t => {
  const p = new Point(0, 1000);
  t.assert.equal(p._unit(), p);
  t.assert.deepEqual(p, new Point(0, 1));
});

test('Point.equals', t => {
  t.assert.equal(new Point(0, 0).equals(new Point(0, 0)), true, 'equal');
  t.assert.equal(new Point(0, 0).equals(new Point(0, 10)), false, 'not equal');
});

test('Point.dist', t => {
  const zero = new Point(0, 0);
  t.assert.equal(new Point(0, 10).dist(zero), 10);
  t.assert.equal(new Point(Math.sqrt(2), Math.sqrt(2)).dist(zero), 2);
  t.assert.equal(zero.dist(zero), 0);
});

test('Point.mult', t => {
  t.assert.deepEqual(new Point(0, 0).mult(5), new Point(0, 0));
  t.assert.deepEqual(new Point(0, 1).mult(5), new Point(0, 5));
  t.assert.deepEqual(new Point(1, 1).mult(5), new Point(5, 5));
});

test('Point._mult', t => {
  const p = new Point(1, -2);
  t.assert.equal(p._mult(5), p);
  t.assert.deepEqual(p, new Point(5, -10));
});

test('Point.div', t => {
  t.assert.deepEqual(new Point(0, 0).div(5), new Point(0, 0));
  t.assert.deepEqual(new Point(0, 1).div(5), new Point(0, 1 / 5));
  t.assert.deepEqual(new Point(1, 1).div(5), new Point(1 / 5, 1 / 5));
});

test('Point._div', t => {
  const p = new Point(5, -10);
  t.assert.equal(p._div(5), p);
  t.assert.deepEqual(p, new Point(1, -2));
});

test('Point.multByPoint', t => {
  t.assert.deepEqual(new Point(0, 0).multByPoint(new Point(5, 5)), new Point(0, 0));
  t.assert.deepEqual(new Point(0, 1).multByPoint(new Point(5, 5)), new Point(0, 5));
  t.assert.deepEqual(new Point(1, 1).multByPoint(new Point(4, 5)), new Point(4, 5));
});

test('Point._multByPoint', t => {
  const p = new Point(5, -10);
  t.assert.equal(p._multByPoint(new Point(2, 3)), p);
  t.assert.deepEqual(p, new Point(10, -30));
});

test('Point.divByPoint', t => {
  t.assert.deepEqual(new Point(0, 0).divByPoint(new Point(5, 5)), new Point(0, 0));
  t.assert.deepEqual(new Point(0, 1).divByPoint(new Point(5, 5)), new Point(0, 1 / 5));
  t.assert.deepEqual(new Point(1, 1).divByPoint(new Point(4, 5)), new Point(1 / 4, 1 / 5));
});

test('Point._divByPoint', t => {
  const p = new Point(5, -30);
  t.assert.equal(p._divByPoint(new Point(2, 3)), p);
  t.assert.deepEqual(p, new Point(2.5, -10));
});

test('Point.rotate', t => {
  t.assert.deepEqual(new Point(0, 0).rotate(0), new Point(0, 0));
  t.assert.deepEqual(new Point(0, 1).rotate(Math.PI / 2).round(), new Point(-1, 0));
  t.assert.deepEqual(new Point(0, 1).rotate(Math.PI).round(), new Point(-0, -1));
});

test('Point._rotate', t => {
  const p = new Point(2, 3);
  t.assert.equal(p._rotate(Math.PI / 2)._round(), p);
  t.assert.deepEqual(p, new Point(-3, 2));
});

test('Point.rotateAround', t => {
  t.assert.deepEqual(new Point(2, 3).rotateAround(Math.PI / 2, new Point(2, 2)).round(), new Point(1, 2));
  t.assert.deepEqual(new Point(2, 3).rotateAround(Math.PI, new Point(2, 2)).round(), new Point(2, 1));
});

test('Point._rotateAround', t => {
  const p = new Point(2, 3);
  t.assert.equal(p._rotateAround(Math.PI / 2, new Point(2, 2))._round(), p);
  t.assert.deepEqual(p, new Point(1, 2));
});

test('Point.round', t => {
  t.assert.deepEqual(new Point(0, 0).round(), new Point(0, 0));
  t.assert.deepEqual(new Point(0, 0.5).round(), new Point(0, 1));
  t.assert.deepEqual(new Point(0.2, 0.2).round(), new Point(0, 0));
});

test('Point._round', t => {
  const p = new Point(0.2, 0.2);
  t.assert.equal(p._round(), p);
  t.assert.deepEqual(p, new Point(0, 0));
});

test('Point.angle', t => {
  t.assert.equal(new Point(0, 0).angle(), 0);
  t.assert.equal(new Point(10, 10).angle(), Math.PI / 4);
  t.assert.equal(new Point(0, 10).angle(), Math.PI / 2);
  t.assert.equal(new Point(10, 0).angle(), 0);
});

test('Point.angleTo', t => {
  const b = new Point(0, 0);
  t.assert.equal(new Point(0, 0).angleTo(b), 0);
  t.assert.equal(new Point(10, 10).angleTo(b), Math.PI / 4);
  t.assert.equal(new Point(0, 10).angleTo(b), Math.PI / 2);
  t.assert.equal(new Point(10, 0).angleTo(b), 0);
});

test('Point.angleWith', t => {
  const b = new Point(0, 0);
  t.assert.equal(new Point(0, 0).angleWith(b), 0);
  t.assert.equal(new Point(10, 10).angleWith(b), 0);
  t.assert.equal(new Point(0, 10).angleWith(b), 0);
  t.assert.equal(new Point(10, 0).angleWith(b), 0);
});

test('Point.angleWithSep', t => {
  t.assert.equal(new Point(0, 0).angleWithSep(0, 0), 0);
  t.assert.equal(new Point(10, 10).angleWithSep(0, 0), 0);
  t.assert.equal(new Point(0, 10).angleWithSep(0, 0), 0);
  t.assert.equal(new Point(10, 0).angleWithSep(0, 0), 0);
});

test('Point.matMult', t => {
  t.assert.equal(new Point(0, 0).matMult([0, 0, 0, 0]).equals(new Point(0, 0)), true);
  t.assert.deepEqual(new Point(1, 1).matMult([0, 0, 0, 0]), new Point(0, 0));
  t.assert.deepEqual(new Point(1, 1).matMult([1, 0, 1, 0]), new Point(1, 1));
  t.assert.deepEqual(new Point(1, 1).matMult([1, 0, 0, 0]), new Point(1, 0));
  t.assert.deepEqual(new Point(1, 1).matMult([0, 0, 1, 0]), new Point(0, 1));
  t.assert.deepEqual(new Point(1, 1).matMult([0, 0, 1, 2]), new Point(0, 3));
  t.assert.deepEqual(new Point(1, 1).matMult([1, 1, 1, 1]), new Point(2, 2));
});

test('Point._matMult', t => {
  const p = new Point(10, -20);
  t.assert.equal(p._matMult([3, -1, 1, 2]), p);
  t.assert.deepEqual(p, new Point(50, -30));
});

test('Point.perp', t => {
  t.assert.deepEqual(new Point(0, 1000).perp(), new Point(-1000, 0));
});

test('Point._perp', t => {
  const p = new Point(0, 1000);
  t.assert.equal(p._perp(), p);
  t.assert.deepEqual(p, new Point(-1000, 0));
});

test('Point.add', t => {
  t.assert.deepEqual(new Point(0, 0).add(new Point(10, 10)), new Point(10, 10));
});

test('Point._add', t => {
  const p = new Point(0, 1000);
  t.assert.equal(p._add(new Point(3, 4)), p);
  t.assert.deepEqual(p, new Point(3, 1004));
});

test('Point.sub', t => {
  t.assert.deepEqual(new Point(0, 0).sub(new Point(10, 10)), new Point(-10, -10));
});

test('Point._sub', t => {
  const p = new Point(0, 1000);
  t.assert.equal(p._sub(new Point(3, 4)), p);
  t.assert.deepEqual(p, new Point(-3, 996));
});
