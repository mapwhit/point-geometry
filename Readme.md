[![NPM version][npm-image]][npm-url]
[![Build Status][build-image]][build-url]
[![Dependency Status][deps-image]][deps-url]

# point-geometry

Point geometry with transforms. Fork of [@mapbox/point-geometry] that works on plain {x, y} points.

## Install

```sh
$ npm install --save @mapwhit/point-geometry
```

## API

### `Point(x, y)`

A standalone point geometry with useful accessor, comparison, and modification methods.

### `Point.clone(p)`

Clone this point, returning a new point that can be modified without affecting the old one.

### `Point.convert(p)`

Converts a point-like object to a `Point` object.

### `clone(p)`

Clone this point, returning a new point that can be modified without affecting the old one.

### `from(x, y)`

Creates a new point from x and y coordinates.

### `mag(p)`

Return the magnitude of this point.

### `equals(p, q)`

Compare this point is to another point.

### `dist(p, q)`

Calculate the distance from this point to another point.

### `distSqr(p, q)`

Calculate the distance from this point to another point, without the square root step.

### `angle(p)`

Get the angle from the 0, 0 coordinate to this point, in radians.

### `angleTo(p, q)`

Get the angle from this point to another point, in radians.

### `angleWith(p, b)`

Get the angle between this point and another point, in radians.

### `angleWithSep(p, x, y)`

Find the angle of the two vectors.

### `matMult(p, m)`

Multiply point by a 2x2 matrix.

### `add(p, q)`

Add two points.

### `sub(p, q)`

Subtract two points.

### `mult(p, k)`

Multiply point by a scalar.

### `div(p, k)`

Divide point by a scalar.

### `multByPoint(p, q)`

Multiply point by another point.

### `divByPoint(p, q)`

Divide point by another point.

### `unit(p)`

Normalize point.

### `perp(p)`

Calculate the perpendicular of a point.

### `rotate(p, angle)`

Rotate a point by an angle.

### `rotateAround(p, angle, q)`

Rotate a point around another point.

### `round(p)`

Round the coordinates of a point.

## License

[@mapbox/point-geometry]: https://npmjs.org/package/@mapbox/point-geometry

[ISC](License) © [Damian Krzeminski](https://pirxpilot.me)

[npm-image]: https://img.shields.io/npm/v/@mapwhit/point-geometry
[npm-url]: https://npmjs.org/package/@mapwhit/point-geometry

[build-url]: https://github.com/mapwhit/point-geometry/actions/workflows/check.yaml
[build-image]: https://img.shields.io/github/actions/workflow/status/mapwhit/point-geometry/check.yaml?branch=main

[deps-image]: https://img.shields.io/librariesio/release/npm/@mapwhit/point-geometry
[deps-url]: https://libraries.io/npm/@mapwhit%2Fpoint-geometry
