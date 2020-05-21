import {Vector} from "./geometry";

export class Kinetic {
    maxSpeed: number
    acc: number;
    isStatic: boolean = false;

    static create(maxSpeed: number, acc: number, isStatic?: boolean) :Kinetic {
        return {
            maxSpeed: maxSpeed,
            acc: acc,
            isStatic: isStatic,
        }
    }

    static createStatic() : Kinetic {
        return Kinetic.create(0,0, true)
    }

    // moves from vectorA towards vectorB by a step amount, does not overshoot
    static approach(vectorA: Vector, vectorB: Vector, step: number): Vector {
        if (step > Vector.magnitude(Vector.sub(vectorA, vectorB))) {
            return vectorB
        }
        let angle = Vector.angle(vectorA, vectorB)
        return Vector.project(vectorA, angle, step)

    }
}