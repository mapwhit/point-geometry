/**
 * Clone this point, returning a new point that can be modified
 * without affecting the old one.
 * @return {x: number, y: number} the clone
 */
export function clone(p) {
  return { x: p.x, y: p.y };
}

/**
 * Creates a new point from x and y coordinates.
 * @param {number} x
 * @param {number} y
 * @returns {{x: number, y: number}}
 */
export function from(x, y) {
  return { x, y };
}

/**
 * Return the magnitude of this point: this is the Euclidean
 * distance from the 0, 0 coordinate to this point's x and y
 * coordinates.
 *
 * @return {number} magnitude
 */
export function mag(p) {
  return Math.sqrt(p.x * p.x + p.y * p.y);
}

/**
 * Compare this point is to another point
 *
 * @param {x: number, y: number} p this point
 * @param {x: number, y: number} q the other point
 * @return {boolean} whether the points are equal
 */
export function equals(p, q) {
  return p.x === q.x && p.y === q.y;
}

/**
 * Calculate the distance from this point to another point
 *
 * @param {x: number, y: number} p this point
 * @param {x: number, y: number} q the other point
 * @return {number} distance
 */
export function dist(p, q) {
  const dx = p.x - q.x;
  const dy = p.y - q.y;
  return Math.sqrt(dx * dx + dy * dy);
}

/**
 * Calculate the distance from this point to another point,
 * without the square root step. Useful if you're comparing
 * relative distances.
 *
 * @param {x: number, y: number} p another point
 * @return {number} distance
 */
export function distSqr(p, q) {
  const dx = p.x - q.x;
  const dy = p.y - q.y;
  return dx * dx + dy * dy;
}

/**
 * Get the angle from the 0, 0 coordinate to this point, in radians
 *
 * @return {number} angle
 */
export function angle(p) {
  return Math.atan2(p.y, p.x);
}

/**
 * Get the angle from this point to another point, in radians
 *
 * @param {x: number, y: number} b another point
 * @return {number} angle
 */
export function angleTo(p, q) {
  return Math.atan2(p.y - q.y, p.x - q.x);
}

/**
 * Get the angle between this point and another point, in radians
 *
 * @param {x: number, y: number} b another point
 * @return {number} angle
 */
export function angleWith(p, b) {
  return angleWithSep(p, b.x, b.y);
}

/**
 * Find the angle of the two vectors, solving the formula for
 * the cross product a x b = |a||b|sin(θ) for θ.
 *
 * @param {number} x the x-coordinate
 * @param {number} y the y-coordinate
 * @return {number} the angle in radians
 */
export function angleWithSep(p, x, y) {
  return Math.atan2(p.x * y - p.y * x, p.x * x + p.y * y);
}

/**
 * Multiply point by a 2x2 matrix.
 *
 * @param {x: number, y: number} p
 * @param {[number, number, number, number]} m matrix
 * @return {x: number, y: number} p
 */
export function matMult(p, m) {
  const x = m[0] * p.x + m[1] * p.y;
  const y = m[2] * p.x + m[3] * p.y;
  p.x = x;
  p.y = y;
  return p;
}

/**
 * Add two points.
 *
 * @param {x: number, y: number} p
 * @param {x: number, y: number} q
 * @return {x: number, y: number}
 */
export function add(p, q) {
  p.x += q.x;
  p.y += q.y;
  return p;
}

/**
 * Subtract two points.
 *
 * @param {x: number, y: number} p
 * @param {x: number, y: number} q
 * @return {x: number, y: number}
 */
export function sub(p, q) {
  p.x -= q.x;
  p.y -= q.y;
  return p;
}

/**
 * Multiply point by a scalar.
 *
 * @param {x: number, y: number} p
 * @param {number} k
 * @return {x: number, y: number}
 */
export function mult(p, k) {
  p.x *= k;
  p.y *= k;
  return p;
}

/**
 * Divide point by a scalar.
 *
 * @param {x: number, y: number} p
 * @param {number} k
 * @returns {x: number, y: number}
 */
export function div(p, k) {
  p.x /= k;
  p.y /= k;
  return p;
}

/**
 * Multiply point by another point.
 *
 * @param {x: number, y: number} p
 * @param {x: number, y: number} q
 * @returns {x: number, y: number}
 *
 */
export function multByPoint(p, q) {
  p.x *= q.x;
  p.y *= q.y;
  return p;
}

/**
 * Divide point by another point.
 *
 * @param {x: number, y: number} p
 * @param {x: number, y: number} q
 * @returns {x: number, y: number}
 *
 */
export function divByPoint(p, q) {
  p.x /= q.x;
  p.y /= q.y;
  return p;
}

/**
 * Normalize point.
 *
 * @param {x: number, y: number} p
 * @returns {x: number, y: number}
 */
export function unit(p) {
  const magnitude = Math.sqrt(p.x * p.x + p.y * p.y);
  if (magnitude > 0) {
    p.x /= magnitude;
    p.y /= magnitude;
  }
  return p;
}

/**
 * Calculate the perpendicular of a point.
 *
 * @param {x: number, y: number} p
 * @returns {x: number, y: number}
 */
export function perp(p) {
  const y = p.y;
  p.y = p.x;
  p.x = -y;
  return p;
}

/**
 * Rotate point by angle.
 *
 * @param {x: number, y: number} p
 * @param {number} angle
 * @returns {x: number, y: number}
 */
export function rotate(p, angle) {
  const cos = Math.cos(angle);
  const sin = Math.sin(angle);
  const x = cos * p.x - sin * p.y;
  const y = sin * p.x + cos * p.y;
  p.x = x;
  p.y = y;
  return p;
}

/**
 * Rotate point around another point by angle.
 *
 * @param {{x: number, y: number}} p
 * @param {number} angle
 * @param {{x: number, y: number}} q
 * @returns {{x: number, y: number}}
 */
export function rotateAround(p, angle, q) {
  const cos = Math.cos(angle);
  const sin = Math.sin(angle);
  const x = q.x + cos * (p.x - q.x) - sin * (p.y - q.y);
  const y = q.y + sin * (p.x - q.x) + cos * (p.y - q.y);
  p.x = x;
  p.y = y;
  return p;
}

export function round(p) {
  p.x = Math.round(p.x);
  p.y = Math.round(p.y);
  return p;
}
