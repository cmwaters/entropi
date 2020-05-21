import { Vector } from './geometry'
import { Entity } from "./entity"

export default class Camera {
    origin : Vector
    pos : Vector;
    delta : Vector;
    tracking: Vector = null;

    constructor(pos : Vector = Vector.create()) {
        this.origin = Vector.clone(pos)
        this.pos = pos
        this.delta = Vector.create()
    }

    shift(x : number, y : number): void {
        this.delta.x = x;
        this.delta.y = y;
    }

    update(): void{
        if (this.tracking !== null) {
            this.pos.x = this.origin.x - this.tracking.x;
            this.pos.y = this.origin.y + this.tracking.y;
        } else {
            this.pos = Vector.add(this.pos, this.delta)
            this.delta = Vector.create();
        }
    }

    follow(entity: Entity): void {
        this.tracking = entity.body.position
    }

    output(): string {
        return "x: " + Math.trunc(this.pos.x * 100) / 100 + " y: " + Math.trunc(this.pos.y * 100) / 100;
    }
}