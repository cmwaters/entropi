import {Body, Vector, Bounds} from "matter-js";
import {Input} from "./input";

export class GenericController implements Controller {
    constructor(public object: any , public func: (entity: any, object: any) => void) {
        this.object = object;
        this.func = func;
    }
    
    execute(entity: any): void {
        this.func(entity, this.object)
    }
    
    
}

export class InputController implements Controller {
    constructor(public input: Input, public func: (entity: any, input: Input) => void) {
        this.func = func
        this.input = input
    }
    
    execute(entity: any): void {
        this.func(entity, this.input)
    }
}

export interface Controller {
    execute: (entity: any) => void
}

export namespace Controllers {

    export function directional(input: Input) : Controller {
        let func = (entity: any, input: Input) => {
            if (entity.kinetic === null) { return }
            let desiredVelocity = Vector.create()
            if (input.Key.UP.state || input.Key.W.state) desiredVelocity.y += entity.kinetic.maxSpeed
            if (input.Key.DOWN.state || input.Key.S.state) desiredVelocity.y -= entity.kinetic.maxSpeed
            if (input.Key.LEFT.state || input.Key.A.state) desiredVelocity.x -= entity.kinetic.maxSpeed
            if (input.Key.RIGHT.state || input.Key.D.state) desiredVelocity.x += entity.kinetic.maxSpeed
            let diff = Vector.sub(desiredVelocity, entity.body.velocity)
            Body.applyForce(entity.body, entity.body.position, Vector.mult(diff, entity.kinetic.proportionalGain))

        }
        return new InputController(input, func)
    }


    export function boundary(bound: Bounds): Controller {
        let func = (entity: any, bound: Bounds) => {
            if (entity.body.position.x > bound.max.x) {
                Body.setPosition(entity.body, Vector.create(bound.max.x, entity.body.position.y))
                Body.setVelocity(entity.body, Vector.create())
            }
            if (entity.body.position.x < bound.min.x) {
                Body.setPosition(entity.body, Vector.create(bound.min.x, entity.body.position.y))
                Body.setVelocity(entity.body, Vector.create())
            }
            if (entity.body.position.y > bound.max.y) {
                Body.setPosition(entity.body, Vector.create(entity.body.position.x, bound.max.y))
                Body.setVelocity(entity.body, Vector.create())
            }
            if (entity.body.position.y < bound.min.y) {
                Body.setPosition(entity.body, Vector.create(entity.body.position.x, bound.min.y))
                Body.setVelocity(entity.body, Vector.create())
            }
        }
        return new GenericController(bound, func)
    }

    export function follow(target: Vector): Controller {
        let func = (entity: any, target: Vector) => {
            if (target === null || entity.kinetic === null) { return }
            let diff = Vector.sub(entity.position, target)
            let desiredVelocity = Vector.mult(Vector.normalise(diff), entity.kinetic.maxSpeed)
            let velocityDiff = Vector.sub(desiredVelocity, entity.body.velocity)
            Body.applyForce(entity.body, entity.body.position, Vector.mult(velocityDiff, entity.kinetic.proportionalGain))
        }
        return new GenericController(target, func)
    }

}