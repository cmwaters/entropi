import * as Matter from "matter-js";

// Adds greater functionality to the vector class in matter-js
// All angles are expressed in radians
export class Vector extends Matter.Vector {

    static string(vector: Vector): string {
        return "x: " + vector.x + " y: " + vector.y
    }

    // angle should be relative to the x axis
    static toVector(angle: number, magnitude: number): Vector {
        return Vector.create(Math.cos(angle) * magnitude, Math.sin(angle) * magnitude)
    }

    static toPolar(vector: Vector): Polar {
        return {
            angle: Vector.angle(Vector.create(), vector),
            magnitude: Vector.magnitude(vector)
        }
    }

    static project(vector: Vector, angle: number, magnitude: number): Vector {
        let v = Vector.toVector(angle, magnitude);
        return Vector.add(vector, v)
    }

    static less(vectorA: Vector, vectorB: Vector): boolean {
        return (vectorA.x < vectorB.x && vectorA.y < vectorB.y)
    }

    static abs(vector: Vector): Vector{
        if (vector.x < 0) {
            vector.x = -vector.x
        }
        if (vector.y < 0) {
            vector.y = -vector.y
        }
        return vector
    }

    static equal(vectorA: Vector, vectorB: Vector): boolean {
        return vectorA.x == vectorB.x && vectorA.y == vectorB.y
    }

    static toDegrees(radians: number): number {
        return radians * 180 / Math.PI
    }

    static toRadians(degrees: number): number {
        return degrees / 180 * Math.PI
    }

    static stringTovVec(points : string) : Vector[] {
        let numbers = points.split(',');
        let vectors : Vector[] = [];
        for (let i = 0; i < numbers.length; i = i + 2) {
            vectors.push(Vector.create(parseInt(numbers[i]), parseInt(numbers[i + 1])));
        }
        return vectors
    }

    static angle(vectorA: Vector, vectorB: Vector): number {
        return Math.atan2(vectorB.y - vectorA.y, vectorB.x - vectorA.x);
    }

    static angleBetween(axisA: Axis, axisB: Axis): number {
        let first = Vector.angle(axisA.a, axisA.b);
        let second = Vector.angle(axisB.a, axisB.b);
        let diff = Math.abs(first - second);
        if (diff > Math.PI)
            return 2*Math.PI - diff
        else
            return diff
    }

    // must be three or more vertices in order to be able extend the shape in all directions
    // static extendVertices(vertices: Vector[], magnitude: number): Vector[] {
    //     if (vertices.length < 3) { return vertices}
    //     let length = vertices.length;
    //     let newVertices: Vector[] = [];
    //     for (let i = 0; i < length; i++) {
    //         angle = 2*Math.PI- (Vector.angle(vertices[i], vertices[i + 1]) + Vector.angle(vertices[i])
    //
    //     }
    // }

}

export namespace AXIS {

    export function inverse(axis: Axis): Axis {
        return {a: axis.b, b: axis.a}
    }
    // export function normal(axis: Axis): Axis {
    //
    // }
    //
    export function toVector(axis: Axis): Vector {
        return Vector.sub(axis.b, axis.a)
    }

}

// an orientation refers to both a position and rotation
export type Orientation = {
    pos: Vector,
    rotation: number
}

// a bound is made up of a minimum and maximum vector which create the rectangle that defines the bound
export type Bound = {
    min: Vector,
    max: Vector
}

// an axis is make up of two vectors that represent a line. Note: that this has a direction a -> b
export type Axis = {
    a: Vector
    b: Vector
}

// as opposed to the cartesian system used in the default Vector, this type represents a 2D point in space using
// the polar system
export type Polar = {
    angle: number,
    magnitude: number
}