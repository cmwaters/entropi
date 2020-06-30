// Adds greater functionality to the vector class in matter-js
// All angles are expressed in radians
export namespace Geometry {

    export function string(vector: Vector): string {
        return "x: " + vector.x + " y: " + vector.y
    }
    
    export function create(x: number = 0, y: number = 0): Vector {
        return {x, y}
    }
    export function add(vectorA: Vector, vectorB: Vector): Vector {
        return {x: vectorA.x + vectorB.x, y: vectorA.y + vectorB.y}
    }

    // angle should be relative to the x axis
    // export function toVector(angle: number, magnitude: number): Vector {
    //     return Vector.create(Math.cos(angle) * magnitude, Math.sin(angle) * magnitude)
    // }

    // export function toPolar(vector: Vector): Polar {
    //     return {
    //         angle: Vector.angle(Vector.create(), vector),
    //         magnitude: Vector.magnitude(vector)
    //     }
    // }

    // export function project(vector: Vector, angle: number, magnitude: number): Vector {
    //     let v = Vector.toVector(angle, magnitude);
    //     return Vector.add(vector, v)
    // }

    export function less(vectorA: Vector, vectorB: Vector): boolean {
        return (vectorA.x < vectorB.x && vectorA.y < vectorB.y)
    }

    export function abs(vector: Vector): Vector{
        if (vector.x < 0) {
            vector.x = -vector.x
        }
        if (vector.y < 0) {
            vector.y = -vector.y
        }
        return vector
    }

    export function equal(vectorA: Vector, vectorB: Vector): boolean {
        return vectorA.x == vectorB.x && vectorA.y == vectorB.y
    }

    export function toDegrees(radians: number): number {
        return radians * 180 / Math.PI
    }

    export function toRadians(degrees: number): number {
        return degrees / 180 * Math.PI
    }

    // export function stringTovVec(points : string) : Vector[] {
    //     let numbers = points.split(',');
    //     let vectors : Vector[] = [];
    //     for (let i = 0; i < numbers.length; i = i + 2) {
    //         vectors.push(Vector.create(parseInt(numbers[i]), parseInt(numbers[i + 1])));
    //     }
    //     return vectors
    // }

    export function angle(vectorA: Vector, vectorB: Vector): number {
        return Math.atan2(vectorB.y - vectorA.y, vectorB.x - vectorA.x);
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

// an orientation refers to both a position and rotation
export type Orientation = {
    pos: Vector,
    rotation: number
}

// a bound is made up of a minimum and maximum vector which create the rectangle that defines the bound
export interface Bounds {
    min: Vector;
    max: Vector;
}

export interface Vector {
    x: number;
    y: number;
}

// as opposed to the cartesian system used in the default Vector, this type represents a 2D point in space using
// the polar system
export interface Polar {
    angle: number,
    magnitude: number
}

export type Area = {
    width: number,
    height: number
}