import { Vec2 } from "./vec2";
import { Vec3 } from "./vec3";

/** Generates a random number in [min .. max), picked from a uniform distribution. */
const uniform = (min = 0, max = 1): number => min + (max - min) * Math.random();

/** Generates a random integer in [min .. max), picked from a uniform distribution. */
const int = (min = 0, max = 1): number => Math.floor(uniform(min, max));

/** Generates a random number with a given mean and standard deviation, picked from a normal distribution. */
function boxMuller(mean = 0, stdDev = 1): number {
  let u = 0;
  let v = 0;
  while (u === 0) u = Math.random();
  while (v === 0) v = Math.random();
  const r = Math.sqrt(-2.0 * Math.log(u)) * Math.cos(2.0 * Math.PI * v);
  return mean + stdDev * r;
}

const vec2 = {
  /** Generates a random vector in [min .. max), picked from a uniform distribution. */
  uniform: (min = 0, max = 1): Vec2 =>
    new Vec2(uniform(min, max), uniform(min, max)),

  /** Generates a random vector in the unit circle. */
  inUnitCircle(): Vec2 {
    while (true) {
      const p = vec2.uniform(-1, 1);
      if (p.lengthSquared() >= 1) continue;
      return p;
    }
  },

  /** Generates a random vector in the hemisphere around the given normal. */
  inHemiCircle(normal: Vec2): Vec2 {
    const inUnitCircle = vec2.inUnitCircle();
    return Vec2.dot(inUnitCircle, normal) > 0.0
      ? inUnitCircle
      : inUnitCircle.scaled(-1);
  },
};

const vec3 = {
  /** Generates a random vector in [min .. max), picked from a uniform distribution. */
  uniform: (min = 0, max = 1): Vec3 =>
    new Vec3(uniform(min, max), uniform(min, max), uniform(min, max)),

  /** Generates a random vector in the unit sphere. */
  inUnitSphere(): Vec3 {
    while (true) {
      const p = vec3.uniform(-1, 1);
      if (p.lengthSquared() >= 1) continue;
      return p;
    }
  },

  /** Generates a random vector in the hemisphere around the given normal. */
  inHemiSphere(normal: Vec3): Vec3 {
    const inUnitSphere = vec3.inUnitSphere();
    return Vec3.dot(inUnitSphere, normal) > 0.0
      ? inUnitSphere
      : inUnitSphere.scaled(-1);
  },
};

/** A collection of random number generators. */
export const Random = {
  uniform,
  int,
  boxMuller,
  vec2,
  vec3,
};
