export class Kinetic {
    maxSpeed: number = 1;
    proportionalGain: number = 0.01;

    static create(ko: KineticOptions) :Kinetic {
        return {
            maxSpeed: ko.maxSpeed,
            proportionalGain: ko.proportionalGain,
        }
    }
}

export type KineticOptions = {
    maxSpeed?: number,
    proportionalGain?: number
}