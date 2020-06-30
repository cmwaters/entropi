import { Vector, Geometry } from './geometry'
import { Entity } from "./entity"
import { Body } from './physics'

export class Camera {
    origin : Vector
    pos : Vector;
    delta : Vector;
    tracking: Vector = null;

    constructor(pos : Vector = Geometry.create()) {
        this.origin = Geometry.create(pos.x, pos.y)
        this.pos = pos
        this.delta = Geometry.create()
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
            this.pos = Geometry.add(this.pos, this.delta)
            this.delta = Geometry.create();
        }
    }

    follow(entity: Entity): void {
        this.tracking = entity.body.pos()
    }

    output(): string {
        return "x: " + Math.trunc(this.pos.x * 100) / 100 + " y: " + Math.trunc(this.pos.y * 100) / 100;
    }
}