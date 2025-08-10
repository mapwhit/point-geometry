import {
  add,
  angle,
  angleTo,
  angleWith,
  angleWithSep,
  dist,
  distSqr,
  div,
  divByPoint,
  equals,
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
} from './math.js';

export class Point {
  static clone(p) {
    return new Point(p.x, p.y);
  }

  static convert(p) {
    if (p instanceof Point) {
      return p;
    }
    if (Array.isArray(p)) {
      return new Point(+p[0], +p[1]);
    }
    if (p.x !== undefined && p.y !== undefined) {
      return new Point(+p.x, +p.y);
    }
    throw new Error('Expected [x, y] or {x, y} point format');
  }

  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
}

[angle, angleTo, angleWith, angleWithSep, dist, distSqr, equals, mag].forEach(fn => {
  Point.prototype[fn.name] = makeMethod(fn);
});

[add, div, divByPoint, mag, matMult, mult, multByPoint, perp, rotate, rotateAround, round, sub, unit].forEach(fn => {
  Point.prototype[fn.name] = makeConstMethod(fn);
  Point.prototype[`_${fn.name}`] = makeMethod(fn);
});

function makeMethod(fn) {
  return function (...args) {
    return fn(this, ...args);
  };
}

function makeConstMethod(fn) {
  return function (...args) {
    return fn(Point.clone(this), ...args);
  };
}
