/**
 * A standalone point geometry with useful accessor, comparison, and
 * modification methods.
 *
 * @param {number} x the x-coordinate. this could be longitude or screen
 * pixels, or any other sort of unit.
 * @param {number} y the y-coordinate. this could be latitude or screen
 * pixels, or any other sort of unit.
 * @class Point
 */
export class Point {
  static clone(p) {
    return new Point(p.x, p.y);
  }

  /**
   * Converts a point-like object to a `Point` object.
   * @param {Point | [number, number] | {x: number, y: number}} p
   * @returns {Point}
   */
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

  // Inline frequently used methods for better performance
  equals(q) {
    return this.x === q.x && this.y === q.y;
  }

  mag() {
    return Math.sqrt(this.x * this.x + this.y * this.y);
  }

  distSqr(q) {
    const dx = this.x - q.x;
    const dy = this.y - q.y;
    return dx * dx + dy * dy;
  }

  dist(q) {
    return Math.sqrt(this.distSqr(q));
  }

  angle() {
    return Math.atan2(this.y, this.x);
  }

  angleTo(q) {
    return Math.atan2(this.y - q.y, this.x - q.x);
  }

  angleWith(b) {
    return Math.atan2(this.x * b.y - this.y * b.x, this.x * b.x + this.y * b.y);
  }

  angleWithSep(x, y) {
    return Math.atan2(this.x * y - this.y * x, this.x * x + this.y * y);
  }

  // Mutating methods (modify this point)
  _add(q) {
    this.x += q.x;
    this.y += q.y;
    return this;
  }

  _sub(q) {
    this.x -= q.x;
    this.y -= q.y;
    return this;
  }

  _mult(k) {
    this.x *= k;
    this.y *= k;
    return this;
  }

  _div(k) {
    this.x /= k;
    this.y /= k;
    return this;
  }

  _multByPoint(q) {
    this.x *= q.x;
    this.y *= q.y;
    return this;
  }

  _divByPoint(q) {
    this.x /= q.x;
    this.y /= q.y;
    return this;
  }

  _unit() {
    const magnitude = Math.sqrt(this.x * this.x + this.y * this.y);
    this.x /= magnitude;
    this.y /= magnitude;
    return this;
  }

  _perp() {
    const y = this.y;
    this.y = this.x;
    this.x = -y;
    return this;
  }

  _rotate(angle) {
    const cos = Math.cos(angle);
    const sin = Math.sin(angle);
    const x = cos * this.x - sin * this.y;
    const y = sin * this.x + cos * this.y;
    this.x = x;
    this.y = y;
    return this;
  }

  _rotateAround(angle, q) {
    const cos = Math.cos(angle);
    const sin = Math.sin(angle);
    const x = q.x + cos * (this.x - q.x) - sin * (this.y - q.y);
    const y = q.y + sin * (this.x - q.x) + cos * (this.y - q.y);
    this.x = x;
    this.y = y;
    return this;
  }

  _round() {
    this.x = Math.round(this.x);
    this.y = Math.round(this.y);
    return this;
  }

  _matMult(m) {
    const x = m[0] * this.x + m[1] * this.y;
    const y = m[2] * this.x + m[3] * this.y;
    this.x = x;
    this.y = y;
    return this;
  }

  // Non-mutating methods (return new Point)
  add(q) {
    return new Point(this.x + q.x, this.y + q.y);
  }

  sub(q) {
    return new Point(this.x - q.x, this.y - q.y);
  }

  mult(k) {
    return new Point(this.x * k, this.y * k);
  }

  div(k) {
    return new Point(this.x / k, this.y / k);
  }

  multByPoint(q) {
    return new Point(this.x * q.x, this.y * q.y);
  }

  divByPoint(q) {
    return new Point(this.x / q.x, this.y / q.y);
  }

  unit() {
    const magnitude = Math.sqrt(this.x * this.x + this.y * this.y);
    return new Point(this.x / magnitude, this.y / magnitude);
  }

  perp() {
    return new Point(-this.y, this.x);
  }

  rotate(angle) {
    const cos = Math.cos(angle);
    const sin = Math.sin(angle);
    return new Point(cos * this.x - sin * this.y, sin * this.x + cos * this.y);
  }

  rotateAround(angle, q) {
    const cos = Math.cos(angle);
    const sin = Math.sin(angle);
    return new Point(
      q.x + cos * (this.x - q.x) - sin * (this.y - q.y),
      q.y + sin * (this.x - q.x) + cos * (this.y - q.y)
    );
  }

  round() {
    return new Point(Math.round(this.x), Math.round(this.y));
  }

  matMult(m) {
    return new Point(m[0] * this.x + m[1] * this.y, m[2] * this.x + m[3] * this.y);
  }
}
