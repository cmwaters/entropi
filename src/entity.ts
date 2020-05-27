import {Vector, Bound} from "./geometry";
import Camera from './camera'
import { Body } from './physics'
import { Sprite } from "./types"
import { Kinetic } from "./kinetic"
import { Controller } from './controller'

export class Entity {
    name: string;
    camera: Camera;
    sprite: Sprite = null;
    spriteName: string = "";
    body: Body = null;
    interactionBody: Body = null;
    controllers: Controller[] = [];
    kinetic: Kinetic;
    offset: Vector;
    deleteFlag: boolean = false

    constructor(options: EntityOptions) {
        this.name = options.name
        this.body = options.usingBody;
        if (options.fromSprite !== undefined) {
            this.sprite = options.fromSprite
            this.offset = Vector.create(this.sprite.x, this.sprite.y);
        } else if (options.fromSpriteName !== undefined)
            this.spriteName = options.fromSpriteName;

        if (options.withControllers !== undefined)
            this.controllers.push(...options.withControllers)

        if (options.withDynamicSystem !== undefined)
            this.kinetic = options.withDynamicSystem

        if (options.addInteractionZone !== undefined) {
            this.interactionBody = options.addInteractionZone
        }

    };

    addController(controller: Controller): void {
        this.controllers.push(controller)
    }

    equal(entity: Entity): boolean {
        return this.name === entity.name
    }

    clone(): Entity {
        let vertices: Vector[] = [];
        this.body.vertices.forEach(vertex => vertices.push(Vector.clone(vertex)))
        let interactionVertices: Vector[] = [];
        this.interactionBody.vertices.forEach(vertex => interactionVertices.push(Vector.clone(vertex)))
        let cloneBody = Body.create({
            position: Vector.create(),
            vertices: vertices
        })
        let cloneInteraction = Body.create({
            position: Vector.create(),
            vertices: interactionVertices
        })
        return new Entity({
            name: this.name,
            usingBody: cloneBody,
            fromSprite: this.sprite,
            fromSpriteName: this.spriteName,
            withControllers: this.controllers,
            withDynamicSystem: this.kinetic,
            addInteractionZone: cloneInteraction,
        });
    }

    destroy() {
        this.deleteFlag = true
    }

}

export type EntityOptions = {
    name: string,
    usingBody: Body,
    fromSprite?: Sprite,
    fromSpriteName?: string,
    withControllers?: Controller[],
    withDynamicSystem?: Kinetic,
    addInteractionZone?: Body
}