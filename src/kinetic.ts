import {Vector} from "matter-js";

export class Kinetic {
    maxSpeed: number = 1;
    proportionalGain: number = 0.01;

    static create(ko: KineticOptions) :Kinetic {
        return {
            maxSpeed: ko.maxSpeed,
            proportionalGain: ko.proportionalGain,
        }
    }

    // moves from vectorA towards vectorB by a step amount, does not overshoot
    static approach(vectorA: Vector, vectorB: Vector, step: number): Vector {
        let diff = Vector.sub(vectorA, vectorB)
        if (step > Vector.magnitude(diff)) {
            return vectorB
        }
        return Vector.mult(Vector.normalise(diff), step)
    }
}

export type KineticOptions = {
    maxSpeed?: number,
    proportionalGain?: number
}