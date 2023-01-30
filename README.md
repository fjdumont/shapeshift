# shapeshift

A collection of utilities for generative coding.

## Modules

### Points

A helper type for occasions where no instance of a vector is required.

```typescript
import type { Point2, Point3 } from "shapeshift";

const p2: Point2 = { x: 420, y: 69 };
const p3: Point3 = { x: 1, y: 2, z: 4711 };
```

### Vectors

An instance of a vector with helper functions. There's 2D and 3D vectors. All provided functions are pure/free of side effects.

```typescript
import { Vec2, Vec3 } from "shapeshift";

const v2 = new Vec2(1, 2);
const below = v2.sub(Vec2.unitY);

const v3p = Vec3.fromPoint({ x: 4, y: 5 });
const v3a = Vec3.fromArray([6, 7, 8]).normalized();

const product = Vec3.cross(v3p, v3a);

const reflected = new Vec3(1, 1, 0).reflect(new Vec3(-1, 0, 0));
```

### Random Number Generators

A set of random number generators.

```typescript
import { Random } from "shapeshift";

const u = Random.uniform(-2, 4);
const n = Random.boxMuller(0, 1);

const normal = Random.vec2.inUnitCircle();
const inHemisphere = Random.vec3.inUnitHemisphere(normal);
```
