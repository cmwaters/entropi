import {Vector} from "./geometry";

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
        if (step > Vector.magnitude(Vector.sub(vectorA, vectorB))) {
            return vectorB
        }
        let angle = Vector.angle(vectorA, vectorB)
        return Vector.project(vectorA, angle, step)

    }
}

export type KineticOptions = {
    maxSpeed?: number,
    proportionalGain?: number
}