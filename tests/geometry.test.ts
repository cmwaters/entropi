import { Vector, Axis } from '../src/geometry'

let v1: Vector, v2: Vector, v3: Vector, v4: Vector, v5: Vector;
let a1: Axis, a2: Axis;

beforeEach(() => {
    // resets variables - do not change
    v1 = Vector.create(5, 4)
    v2 = Vector.create(2, 2)
    v3 = Vector.create(4, 3)
    v4 = Vector.create(-2, 0)
    v5 = Vector.create()

    a1 = {a: v4, b: v5}
    a2 = {a: v5, b: v2}
});


test('gets angle between two vectors trial 1', () => {
    expect(Vector.angle(v5, v2)).toBe(Vector.toRadians(45));
    expect(Vector.angle(v5, v2)).toBe(Vector.toRadians(-135));
    expect(Vector.angle(v4, v5)).toBe(Vector.toRadians(0));
    expect(Vector.angle(v1, v3)).toBe(Vector.toRadians(-135));
});

test('gets the angle between two axes', () => {
    expect(Vector.angleBetween(a1, a2)).toBe(Vector.toRadians(45))
})
