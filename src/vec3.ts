import type { Point3 } from "./point3";

/** A 3D vector. */
export class Vec3 {
  constructor(readonly x: number, readonly y: number, readonly z: number) {}

  /** Creates a vector from a point. */
  static fromPoint = (p: Point3) => new Vec3(p.x, p.y, p.z);

  /** Creates a vector from an array. */
  static fromArray = (a: [number, number, number]) =>
    new Vec3(a[0], a[1], a[2]);

  /** Adds two vectors and returns the result. */
  add = (v: Vec3): Vec3 => new Vec3(this.x + v.x, this.y + v.y, this.z + v.z);
  /** Subtracts two vectors and returns the result. */
  sub = (v: Vec3): Vec3 => new Vec3(this.x - v.x, this.y - v.y, this.z - v.z);

  /** Scales a vector by a scalar and returns the result. */
  scaled = (s: number): Vec3 => new Vec3(this.x * s, this.y * s, this.z * s);

  /** Returns the squared length of the vector. */
  lengthSquared = (): number =>
    this.x * this.x + this.y * this.y + this.z * this.z;
  /** Returns the length of the vector. */
  length = (): number => Math.sqrt(this.lengthSquared());

  /** Returns a normalized copy of the vector. */
  normalized = (): Vec3 => this.scaled(1 / this.length());

  /** Reflects the vector about the given normal. */
  reflect = (n: Vec3): Vec3 => this.sub(n.scaled(2 * Vec3.dot(this, n)));

  /** Refracts the vector through the given normal, with the given index of refraction. */
  refract(n: Vec3, eta: number): Vec3 {
    const cosTheta = Math.min(Vec3.dot(this.scaled(-1), n), 1);
    const rOutPerp = this.add(n.scaled(cosTheta)).scaled(eta);
    const rOutParallel = n.scaled(
      -Math.sqrt(Math.abs(1 - rOutPerp.lengthSquared()))
    );
    return rOutPerp.add(rOutParallel);
  }

  /** Computes the dot product of two vectors. */
  static dot = (u: Vec3, v: Vec3): number => u.x * v.x + u.y * v.y + u.z * v.z;

  /** Computes the cross product of two vectors. */
  static cross = (u: Vec3, v: Vec3): Vec3 =>
    new Vec3(
      u.y * v.z - u.z * v.y,
      u.z * v.x - u.x * v.z,
      u.x * v.y - u.y * v.x
    );

  static zero = new Vec3(0, 0, 0);
  static one = new Vec3(1, 1, 1);

  static unitX = new Vec3(1, 0, 0);
  static unitY = new Vec3(0, 1, 0);
  static unitZ = new Vec3(0, 0, 1);
}
