import type { Point2 } from "./point2";

/** A 2D vector. */
export class Vec2 {
  constructor(readonly x: number, readonly y: number) {}

  /** Creates a vector from a point. */
  static fromPoint = (p: Point2) => new Vec2(p.x, p.y);

  /** Adds two vectors and returns the result. */
  add = (v: Vec2): Vec2 => new Vec2(this.x + v.x, this.y + v.y);
  /** Subtracts two vectors and returns the result. */
  sub = (v: Vec2): Vec2 => new Vec2(this.x - v.x, this.y - v.y);

  /** Scales a vector by a scalar and returns the result. */
  scaled = (s: number): Vec2 => new Vec2(this.x * s, this.y * s);

  /** Returns the squared length of the vector. */
  lengthSquared = (): number => this.x * this.x + this.y * this.y;
  /** Returns the length of the vector. */
  length = (): number => Math.sqrt(this.lengthSquared());

  /** Returns a normalized copy of the vector. */
  normalized = (): Vec2 => this.scaled(1 / this.length());

  /** Reflects the vector about the given normal. */
  reflect = (n: Vec2): Vec2 => this.sub(n.scaled(2 * Vec2.dot(this, n)));

  /** Refracts the vector through the given normal, with the given index of refraction. */
  refract(n: Vec2, eta: number): Vec2 {
    const cosTheta = Math.min(Vec2.dot(this.scaled(-1), n), 1);
    const rOutPerp = this.add(n.scaled(cosTheta)).scaled(eta);
    const rOutParallel = n.scaled(
      -Math.sqrt(Math.abs(1 - rOutPerp.lengthSquared()))
    );
    return rOutPerp.add(rOutParallel);
  }

  /** Computes the dot product of two vectors. */
  static dot = (u: Vec2, v: Vec2): number => u.x * v.x + u.y * v.y;

  /** Computes the cross product of two vectors. */
  static cross = (u: Vec2, v: Vec2): number => u.x * v.y - u.y * v.x;

  static zero = new Vec2(0, 0);
  static one = new Vec2(1, 1);

  static unitX = new Vec2(1, 0);
  static unitY = new Vec2(0, 1);
}
